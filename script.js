if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}

function init() {
    const data = {
        name: 'Каталог товаров',
        hasChildren: true,
        items: [
            {
                name: 'Мойки',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    },
                    {
                        name: 'Handmade',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Glass',
                        hasChildren: false,
                        items: []
                    }
                ]
            },{
                name: 'Фильтры',
                hasChildren: true,
                items: [
                    {
                        name: 'Ulgran',
                        hasChildren: true,
                        items: [
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            },
                            {
                                name: 'Smth',
                                hasChildren: false,
                                items: []
                            }
                        ]
                    },
                    {
                        name: 'Vigro Mramor',
                        hasChildren: false,
                        items: []
                    }
                ]
            }
        ]
    }


    const items = new ListItems(document.getElementById('list-items'), data)


    items.render()
    items.init()

    function ListItems(el, data) {
        this.el = el;
        this.data = data;

        this.init = function () {
            this.el.addEventListener('click', (event) => {
                const openElement = event.target.closest('[data-open]')
                if (openElement) {
                    const parent = openElement.closest('[data-parent]')
                    if (parent) {
                        this.toggleItems(parent)
                    }
                }
            })
        }

        this.render = function () {
            this.el.insertAdjacentHTML('beforeend', this.renderParent(this.data))
        }

        this.renderParent = function (data) {
            if (data.hasChildren && data.items.length > 0) {
                let children = ''
                data.items.forEach(child => {
                    if (child.hasChildren && child.items.length > 0) {
                        children += this.renderParent(child)
                    } else {
                        children += this.renderChildren(child)
                    }
                })
                
                return `
                    <div class="list-item" data-parent>
                        <div class="list-item__inner">
                            <img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>
                            <img class="list-item__folder" src="img/folder.png" alt="folder">
                            <span>${data.name}</span>
                        </div>
                        <div class="list-item__items">
                            ${children}
                        </div>
                    </div>
                `
            }
            
            return `
                <div class="list-item" data-parent>
                    <div class="list-item__inner">
                        <img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>${data.name}</span>
                    </div>
                    <div class="list-item__items">
                    </div>
                </div>
            `

        }

        this.renderChildren = function (data) {
            return `
                <div class="list-item">
                    <div class="list-item__inner">
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>${data.name}</span>
                    </div>
                </div>
            `
        }

        this.toggleItems = function (parent) {
            parent.classList.toggle('list-item_open')
        }

    }

}
