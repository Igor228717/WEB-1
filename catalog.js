import { Catalog } from "./src/components/catalog.js"

const renderPostItem = item => `
    <a href="posts.html?id=${item.id}" class="post-item">
        <span class="post-item__title">${item.title}</span>
        <span class="post-item__body">${item.body}</span>
    </a>
`

const getPostItems = async ({ limit, page }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
    if (!res.ok) throw new Error('Ошибка загрузки постов')
    return { items: await res.json(), total: +res.headers.get('x-total-count') }
}

const renderPhotoItem = item => `
    <a href="photos/${item.id}" class="photo-item">
        <span class="photo-item__title">${item.title}</span>
        <img src=${item.url} class="photo-item__image">
    </a>
`

const getPhotoItems = async ({ limit, page }) => {
    const res = await fetch(`https://jsonplaceholder.typicode.com/photos?_limit=${limit}&_page=${page}`)
    if (!res.ok) throw new Error("Ошибка загрузки фото")
    return { items: await res.json(), total: +res.headers.get('x-total-count') }
}

const init = () => {
    const catalog = document.getElementById('catalog')
    const typeSelect = document.getElementById('content-type')
    
    const loadCatalog = (type) => {
        const config = {
            posts: { renderItem: renderPostItem, getItems: getPostItems },
            photos: { renderItem: renderPhotoItem, getItems: getPhotoItems }
        }
        new Catalog(catalog, config[type]).init()
    }
    
    if (typeSelect) {
        loadCatalog(typeSelect.value)
        typeSelect.addEventListener('change', (e) => {
            catalog.innerHTML = ''
            loadCatalog(e.target.value)
        })
    } else {
        loadCatalog('posts')
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init)
} else {
    init()
}