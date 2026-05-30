/*
 * Клиентская логика для RetroGameShop
 * Разработчик: [Маметов Игорь]
 * Функции: загрузка, добавление, редактирование, удаление отзывов
 */

document.addEventListener('DOMContentLoaded', () => {
    const section = document.querySelector('.reviews');
    if (!section) return;

    const gameId = +section.dataset.gameId;
    const list = document.getElementById('reviews-list');
    const form = document.getElementById('reviews-form');

    async function api(action, params = {}) {
        const res = await fetch('api.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ action, ...params }),
        });
        return res.json();
    }

    const escape = (s) => {
        const div = document.createElement('div');
        div.textContent = s;
        return div.innerHTML;
    };

    const stars = (n) => '★'.repeat(n) + '☆'.repeat(5 - n);

    const formatDate = (iso) => {
        const d = new Date(iso);
        return d.toLocaleDateString('ru-RU', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    };

    async function loadReviews() {
        list.innerHTML = '<p class="loading">загрузка...</p>';
        const res = await api('list', { game_id: gameId });

        if (!res.ok) {
            list.innerHTML = '<p class="empty">ошибка загрузки</p>';
            return;
        }
        if (!res.data.length) {
            list.innerHTML = '<p class="empty">пока ни одного отзыва. будь первым!</p>';
            return;
        }
        list.innerHTML = res.data.map(item => `
            <div class="review" data-id="${item.id}" data-rating="${item.rating}">
                <div class="review__header">
                    <span class="review__author">${escape(item.nickname)}</span>
                    <span class="review__stars">${stars(+item.rating)}</span>
                    <span class="review__date">${formatDate(item.created_at)}</span>
                </div>
                <p class="review__text">${escape(item.comment)}</p>
                <div class="review__actions">
                    <button class="edit-btn">✎ править</button>
                    <button class="delete-btn">✖ удалить</button>
                </div>
            </div>
        `).join('');
    }
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const fd = new FormData(form);
        const res = await api('create', {
            game_id: gameId,
            nickname: fd.get('nickname'),
            rating: fd.get('rating'),
            comment: fd.get('comment'),
        });
        if (res.ok) {
            form.reset();
            loadReviews();
        } else {
            alert('Ошибка: ' + res.error);
        }
    });
    list.addEventListener('click', async (e) => {
        const card = e.target.closest('.review');
        if (!card) return;
        const id = +card.dataset.id;

        if (e.target.classList.contains('delete-btn')) {
            if (!confirm('Удалить этот отзыв?')) return;
            const res = await api('delete', { id });
            if (res.ok) loadReviews();
        }

        if (e.target.classList.contains('edit-btn')) {
            const oldText = card.querySelector('.review__text').innerText;
            const newText = prompt('Новый текст отзыва:', oldText);
            if (newText === null) return;

            const oldRating = +card.dataset.rating;
            const newRating = prompt('Новая оценка (1–5):', oldRating);
            if (newRating === null) return;

            const res = await api('update', { id, comment: newText, rating: +newRating });
            if (res.ok) loadReviews();
            else alert('Ошибка: ' + res.error);
        }
    });
    loadReviews();
    const ratingEl = document.querySelector('[data-rating]');
    if (ratingEl) {
        const stars = ratingEl.querySelectorAll('.rating__star');
        const hidden = ratingEl.parentElement.querySelector('input[name="rating"]');
        let currentValue = 5;

        const paint = (value) => {
            stars.forEach(s => {
                if (+s.dataset.value <= value) {
                    s.textContent = '★';
                    s.style.color = '#ffcc00';
                } else {
                    s.textContent = '☆';
                    s.style.color = '#444';
                }
            });
        };

        stars.forEach(star => {
            star.addEventListener('mouseenter', () => paint(+star.dataset.value));
            star.addEventListener('click', () => {
                currentValue = +star.dataset.value;
                hidden.value = currentValue;
                paint(currentValue);
            });
        });
        ratingEl.addEventListener('mouseleave', () => paint(currentValue));
        paint(currentValue);
    }
});