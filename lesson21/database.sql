USE retro_shop;

DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS games;

CREATE TABLE games (
    id          INT AUTO_INCREMENT PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    console     VARCHAR(100) NOT NULL,
    image       VARCHAR(255) NOT NULL,
    price       DECIMAL(10, 2) NOT NULL,
    year        INT NOT NULL,
    description TEXT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE reviews (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    game_id    INT NOT NULL,
    nickname   VARCHAR(100) NOT NULL,
    rating     TINYINT NOT NULL,
    comment    TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_game FOREIGN KEY (game_id) REFERENCES games(id) ON DELETE CASCADE,
    INDEX idx_game (game_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO games (name, console, image, price, year, description) VALUES
('Sonic the Hedgehog', 'Sega Mega Drive', 'img/games/sonic.jpg', 1250, 1991,
 'Классический платформер про синего ежа, который бежит быстрее звука. Культовая игра для Sega. Искал этот картридж целый год на барахолке.'),

('The Legend of Zelda', 'Nintendo NES', 'img/games/zelda.jpg', 2350, 1986,
 'Первая игра про Линка. Картридж с золотым корпусом, батарейка внутри до сих пор работает. Сохранял прогресс в детстве через save/load.'),

('Pokémon Red', 'GameBoy', 'img/games/pokemon.jpg', 3200, 1996,
 'Оригинальная японская версия. Выбирал Charmander. Прошёл 150 покемонов, Mew так и не поймал. Батарейка села, сохранения сбросились — боль на всю жизнь.'),

('Metal Gear Solid', 'PlayStation 1', 'img/games/mgs.jpg', 1850, 1998,
 '3 диска. Проходил сквозь слёзы, потому что второй диск царапаный. Psycho Mantis читал мои сохранения на Memory Card — до сих пор в шоке.'),

('Super Mario 64', 'Nintendo 64', 'img/games/mario64.jpg', 2750, 1996,
 'Один из первых 3D-платформеров. Собирал 120 звёзд — прошло полтора года. Картридж пахнет детством и пылью.'),

('Street Fighter II', 'SNES', 'img/games/sf2.jpg', 990, 1991,
 'Драка, ради которой разбивали джойстики. E.Honda и его сто ладоней. Пароли на продолжение записывали в школьную тетрадь.'),

('Final Fantasy VII', 'PlayStation 1', 'img/games/ff7.jpg', 2150, 1997,
 '3 диска, история про Сефирота и Айрис. Мечта моей юности. Японская версия с буклетом на японском — разбирал по картинкам.'),

('Tetris', 'GameBoy', 'img/games/tetris.jpg', 450, 1989,
 'Самая простая и самая адская игра. Картридж видал лучшие времена, но работает как часы. Способ отключить мозг на 20 минут.'),

('GoldenEye 007', 'Nintendo 64', 'img/games/goldeneye.jpg', 1450, 1997,
 'Мультиплеер на 4 человека. Oddjob запрещался на уровне локального закона. Лицензия Rare, память на картридже.'),

('Crash Bandicoot', 'PlayStation 1', 'img/games/crash.jpg', 890, 1996,
 'Оранжевый бандикут, который бегал по кругу. Рисовал уровни на бумаге, потому что не было интернета.');

INSERT INTO reviews (game_id, nickname, rating, comment) VALUES
(1, 'sega_fan_90', 5, 'Соня — это моё детство. Картридж как новый, всё работает. Спасибо продавцу!'),
(1, 'retro_dima', 4, 'Хорошая копия. Есть небольшие потёртости, но для коллекции пойдёт.'),
(3, 'pokemonmaster', 5, 'Оригинал! Даже батарейка живая. Поймал Mew через глитч.'),
(5, 'mario_lover', 5, '120 звёзд. Прошёл за месяц. Идеальное состояние картриджа.');