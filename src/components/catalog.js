export class Catalog {
    #el = null
    #paginationEl = null
    #itemsEl = null
    #page = null
    #total = null
    #renderItem = null
    #getItems = null
    #searchQuery = null      
    #sortField = null        
    #sortOrder = 'asc'       

    constructor(el, options) {
        const { renderItem, getItems } = options
        this.#el = el
        this.#page = this.getPage()
        this.#paginationEl = el.querySelector('[data-catalog-pagination]')
        this.#itemsEl = el.querySelector('[data-catalog-items]')
        this.#renderItem = renderItem
        this.#getItems = getItems
        this.#searchQuery = this.getSearchQuery()  // + из URL
        this.#sortField = this.getSortField()      // + из URL
        this.#sortOrder = this.getSortOrder()      // + из URL
    }
    get limit () {
        return 12;
    }

    get pageCount () {
        return Math.ceil(this.#total / this.limit)
    }
    init () {
        window.onpopstate = () => {
            const url = new URL(window.location.href);
            const page = +url.searchParams.get('page');
            const query = url.searchParams.get('q');
            const sort = url.searchParams.get('sort');

            if (page !== this.#page || query !== this.#searchQuery || sort !== this.#sortField) {
                this.#searchQuery = query
                this.#sortField = this.getSortField()
                this.#sortOrder = this.getSortOrder()
                this.setPage(page);
                this.loadItems()
            }
        }
        this.#paginationEl.addEventListener('click', (event) => {
            const item = event.target.dataset.catalogPaginationPage ? event.target : event.target.closest('[data-catalog-pagination-page]')

            if (!item) {
                return;
            }

            const page = +item.dataset.catalogPaginationPage

            this.setPage(page);
            this.pushState();
            this.loadItems()
        })
        this.initSearch()   
        this.initSort()     
        this.loadItems()
    }

    getPage () {
        const url = new URL(window.location.href);
        const page = +url.searchParams.get('page');
        return page || 1;
    }

    getSearchQuery () {
        const url = new URL(window.location.href);
        return url.searchParams.get('q') || '';
    }

    getSortField () {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort');
        return sort ? sort.split(':')[0] : null;
    }

    getSortOrder () {
        const url = new URL(window.location.href);
        const sort = url.searchParams.get('sort');
        return sort ? sort.split(':')[1] || 'asc' : 'asc';
    }

    setPage (page) {
        this.#page = page
    }

    pushState () {
        const url = new URL(window.location.href);
        url.searchParams.set('page', this.#page);
        
        if (this.#searchQuery) {
            url.searchParams.set('q', this.#searchQuery);
        } else {
            url.searchParams.delete('q');
        }
        
        if (this.#sortField) {
            url.searchParams.set('sort', `${this.#sortField}:${this.#sortOrder}`);
        } else {
            url.searchParams.delete('sort');
        }

        window.history.pushState({}, '', url)
    }

    async loadItems () {
        try {
            const params = {
                limit: this.limit,
                page: this.#page,
                ...(this.#searchQuery && { q: this.#searchQuery }),
                ...(this.#sortField && { sortBy: this.#sortField, order: this.#sortOrder })
            }
            
            const { items, total } = await this.#getItems(params);
                
            this.#total = total
            this.renderItems(items)
            this.renderPagination()

        } catch (error) {
            this.#itemsEl.innerHTML = 'Ошибка загрузки';
            this.#paginationEl.innerHTML = '';
        }
    }

    renderItems (items) {
        if (!items.length) {
            this.#itemsEl.innerHTML = '<div class="catalog__empty">Ничего не найдено</div>';
            return;
        }
        this.#itemsEl.innerHTML = items.map(this.#renderItem).join('')
    }

    renderPagination () {
        if (this.pageCount <= 1) {
            this.#paginationEl.innerHTML = '';
            return;
        }
        
        let html = ''

        for (let index = 0; index < this.pageCount; index++) {
            const page = index + 1;

            const classes = ['catalog__pagination-item']

            if (page === this.#page) {
                classes.push('catalog__pagination-item_active')
            }

            html += `
                <button
                    class="${classes.join(' ')}"
                    data-catalog-pagination-page="${page}"
                >
                    ${page}
                </button>
            `
        }

        this.#paginationEl.innerHTML = html
    }
    initSearch () {
        const searchInput = this.#el.querySelector('[data-catalog-search]')
        if (!searchInput) return;
        
        searchInput.value = this.#searchQuery || ''
        
        let timeout
        searchInput.addEventListener('input', (e) => {
            clearTimeout(timeout)
            timeout = setTimeout(() => {
                this.#searchQuery = e.target.value
                this.setPage(1)
                this.pushState()
                this.loadItems()
            }, 300)
        })
    }

    // + индивидуально: инициализация сортировки
    initSort () {
        const sortSelect = this.#el.querySelector('[data-catalog-sort]')
        if (!sortSelect) return;
        
        if (this.#sortField) {
            sortSelect.value = `${this.#sortField}:${this.#sortOrder}`
        }
        
        sortSelect.addEventListener('change', (e) => {
            const [field, order] = e.target.value.split(':')
            this.#sortField = field
            this.#sortOrder = order || 'asc'
            this.setPage(1)
            this.pushState()
            this.loadItems()
        })
    }
}