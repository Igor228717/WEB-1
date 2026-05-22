let currentPizza = null;

function updatePizzaImage(type) {
    document.querySelectorAll('.pizza-img').forEach(img => img.classList.remove('active'));
    const activeImg = document.getElementById(`img-${type}`);
    if (activeImg) activeImg.classList.add('active');
}

function createPizzaFromUI() {
    const activeType = document.querySelector('#typeGroup .pill.active').dataset.value;
    const activeSize = document.querySelector('#sizeGroup .pill.active').dataset.value;
    
    const pizza = new Pizza(activeType, activeSize);
    
    document.querySelectorAll('.toppings-grid input:checked').forEach(checkbox => {
        try {
            pizza.addTopping(checkbox.value);
        } catch(e) {
            console.warn(e.message);
        }
    });
    
    return pizza;
}

function updateGlow() {
    const glow = document.getElementById('pizzaGlow');
    if (glow) {
        const activeType = document.querySelector('#typeGroup .pill.active')?.dataset.value;
        const colors = { MARGARITA: '#f5a65a', PEPPERONI: '#d64531', BAVARIAN: '#c49a6c' };
        glow.style.background = `radial-gradient(circle, ${colors[activeType] || '#f5a65a'}80, transparent 70%)`;
    }
}

// Переключение типа пиццы
document.querySelectorAll('#typeGroup .pill').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#typeGroup .pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        updatePizzaImage(btn.dataset.value);
        updateGlow();
    });
});

// Переключение размера
document.querySelectorAll('#sizeGroup .pill').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('#sizeGroup .pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    });
});

// Кнопка "Добавить в корзину"
document.getElementById('result').addEventListener('click', () => {
    try {
        const pizza = createPizzaFromUI();
        const typeName = document.querySelector('#typeGroup .pill.active').innerText;
        const sizeName = document.querySelector('#sizeGroup .pill.active').innerText;
        const toppings = pizza.getToppings().map(t => {
            const label = document.querySelector(`input[value="${t}"]`)?.closest('.topping-label')?.querySelector('span')?.innerText;
            return label || t;
        });
        
        const message = `🍕 Заказ добавлен!\n\nПицца: ${typeName}\nРазмер: ${sizeName}\nДобавки: ${toppings.length ? toppings.join(', ') : 'нет'}\n\n💰 Цена: ${pizza.calculatePrice()} руб.\n🔥 Калории: ${pizza.calculateCalories()} ккал`;
        
        alert(message);
        
        // Небольшая анимация кнопки
        const btn = document.getElementById('result');
        btn.style.transform = 'scale(0.98)';
        setTimeout(() => btn.style.transform = '', 150);
        
    } catch(e) {
        alert('Ошибка: ' + e.message);
    }
});

// Инициализация
updatePizzaImage('MARGARITA');
updateGlow();