class PizzaError extends Error {
    constructor(message) {
        super(message);
        this.name = 'PizzaError';
    }
}

// ВИДЫ ПИЦЦ
const PIZZA_TYPES = {
    MARGARITA: { price: 500, calories: 300 },
    PEPPERONI: { price: 600, calories: 400 },
    BAVARIAN: { price: 700, calories: 450 }
};

// РАЗМЕРЫ ПИЦЦ
const SIZES = {
    SMALL: { price: 100, calories: 100 },
    LARGE: { price: 200, calories: 200 }
};

// ДОБАВКИ В ПИЦЦЦУ 
const TOPPINGS = {
    MOZZARELLA: { price: 50, calories: 20 },

    CHEESE_BORDER: {
        SMALL: { price: 150, calories: 50 },
        LARGE: { price: 300, calories: 50 }
    },

    CHEDDAR_PARMESAN: {
        SMALL: { price: 150, calories: 50 },
        LARGE: { price: 300, calories: 50 }
    }
};

// СОЗДАНИЕ ПИЦЦЫ
class Pizza {
    constructor(type, size) {
        if (!PIZZA_TYPES[type]) throw new PizzaError('Такого типа пиццы не существует');
        if (!SIZES[size]) throw new PizzaError('Такого размера пиццы не существует');

        this.type = type;
        this.size = size;
        this.toppings = new Set();
    }

    addTopping(topping) {
        if (!TOPPINGS[topping]) throw new PizzaError('Такой добавки не существует');
        this.toppings.add(topping);
    }

    removeTopping(topping) {
        this.toppings.delete(topping);
    }

    getToppings() {
        return [...this.toppings];
    }

    getSize() {
        return this.size;
    }

    getStuffing() {
        return this.type;
    }

    calculatePrice() {
        let total = PIZZA_TYPES[this.type].price + SIZES[this.size].price;

        for (const topping of this.toppings) {
            if (TOPPINGS[topping].price) {
                total += TOPPINGS[topping].price;
            } else {
                total += TOPPINGS[topping][this.size].price;
            }
        }

        return total;
    }

    calculateCalories() {
        let total = PIZZA_TYPES[this.type].calories + SIZES[this.size].calories;

        for (const topping of this.toppings) {
            if (TOPPINGS[topping].calories) {
                total += TOPPINGS[topping].calories;
            } else {
                total += TOPPINGS[topping][this.size].calories;
            }
        }

        return total;
    }
}

/* ПРОВЕРКА
const pizza = new Pizza('PEPPERONI', 'LARGE');

pizza.addTopping('MOZZARELLA');
pizza.addTopping('CHEESE_BORDER');

console.log('Тип:', pizza.getStuffing());
console.log('Размер:', pizza.getSize());
console.log('Добавки:', pizza.getToppings());
console.log('Цена:', pizza.calculatePrice());
console.log('Калории:', pizza.calculateCalories());
*/