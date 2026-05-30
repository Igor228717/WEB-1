if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    init();
}

function init() {
    const el = document.getElementById('list-items');
    if (!el) return;

    el.addEventListener('click', (e) => {
        const arrow = e.target.closest('[data-open]');
        if (arrow) {
            const parent = arrow.closest('[data-parent]');
            if (parent) {
                parent.classList.toggle('list-item_open');
            }
        }
    });
}