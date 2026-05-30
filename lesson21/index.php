<?php
/*
 * Главная страница: каталог ретро-игр
 * Автор: [Маметов Игорь]
 * Дата: май 2026
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/GameRepository.php';

try {
    $gameRepo = new GameRepository(getPDO());
    $games    = $gameRepo->fetchAll();
} catch (PDOException $e) {
    die('Ошибка БД: ' . htmlspecialchars($e->getMessage()));
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>RetroGameShop — каталог ретро-игр</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <header>
        <h1 class="logo">🎮 RetroGameShop</h1>
        <p class="subtitle">игры из моего детства • в наличии: <?= count($games) ?> шт.</p>
    </header>

    <div class="catalog">
        <?php foreach ($games as $i => $game): ?>
            <a class="card" href="game.php?id=<?= (int)$game['id'] ?>">
                <div class="card__badge">#<?= sprintf('%03d', $i + 1) ?></div>
                <img class="card__img"
                     src="<?= htmlspecialchars($game['image']) ?>"
                     alt="<?= htmlspecialchars($game['name']) ?>"
                     loading="lazy">
                <div class="card__info">
                    <h2 class="card__title"><?= htmlspecialchars($game['name']) ?></h2>
                    <p class="card__console">📀 <?= htmlspecialchars($game['console']) ?></p>
                    <p class="card__price"><?= number_format((float)$game['price'], 0, ',', ' ') ?> ₽</p>
                </div>
            </a>
        <?php endforeach; ?>
    </div>
</div>
</body>
</html>