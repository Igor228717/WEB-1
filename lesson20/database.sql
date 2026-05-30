CREATE DATABASE IF NOT EXISTS catalog_menu
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

USE catalog_menu;

DROP TABLE IF EXISTS menu_items;

CREATE TABLE menu_items (
    id         INT AUTO_INCREMENT PRIMARY KEY,
    parent_id  INT NULL,
    name       VARCHAR(255) NOT NULL,
    sort_order INT NOT NULL DEFAULT 0,
    icon       VARCHAR(100) DEFAULT NULL,

    CONSTRAINT fk_parent
        FOREIGN KEY (parent_id) REFERENCES menu_items(id)
        ON DELETE CASCADE,

    INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO menu_items (id, parent_id, name, sort_order, icon) VALUES
    (1,  NULL, 'Лето 2026', 1, 'sun'),
    (2,  1,   'Пляжный отдых', 1, 'beach'),
    (3,  2,   'Шезлонги', 1, 'chair'),
    (4,  2,   'Зонты от солнца', 2, 'umbrella'),
    (5,  2,   'Пляжные полотенца', 3, 'towel'),
    (6,  1,   'Активный отдых', 2, 'active'),
    (7,  6,   'Сёрфинг', 1, 'surf'),
    (8,  6,   'Каякинг', 2, 'kayak'),
    (9,  6,   'Пляжный волейбол', 3, 'volleyball'),
    (10, 1,   'Путешествия', 3, 'travel'),
    (11, 10,  'Европа', 1, 'europe'),
    (12, 11,  'Италия', 1, 'italy'),
    (13, 11,  'Греция', 2, 'greece'),
    (14, 11,  'Испания', 3, 'spain'),
    (15, 10,  'Азия', 2, 'asia'),
    (16, 15,  'Таиланд', 1, 'thailand'),
    (17, 15,  'Вьетнам', 2, 'vietnam'),
    (18, 15,  'Индонезия', 3, 'indonesia'),
    (19, 1,   'Летние напитки', 4, 'drink'),
    (20, 19,  'Мохито', 1, 'mojito'),
    (21, 19,  'Пина Колада', 2, 'pina'),
    (22, 19,  'Лимонад', 3, 'lemonade'),
    (23, 1,   'Товары для кемпинга', 5, 'camping'),
    (24, 23,  'Палатки', 1, 'tent'),
    (25, 23,  'Спальники', 2, 'sleeping'),
    (26, 23,  'Мангалы', 3, 'grill');