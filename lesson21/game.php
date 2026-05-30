<?php
/*
 * Страница отдельной игры с формой отзывов
 * Автор: [Маметов Игорь]
 */

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/GameRepository.php';

$id = (int)($_GET['id'] ?? 0);
$game = (new GameRepository(getPDO()))->fetchById($id);

if (!$game) {
    require __DIR__ . '/404.php';
    exit;
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= htmlspecialchars($game['name']) ?> — RetroGameShop</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container">
    <a class="back-link" href="index.php">← назад в каталог</a>

    <div class="game">
        <img class="game__img" src="<?= htmlspecialchars($game['image']) ?>" alt="<?= htmlspecialchars($game['name']) ?>">
        <div class="game__info">
            <div class="game__meta">🎮 <?= htmlspecialchars($game['console']) ?> • <?= $game['year'] ?> г.</div>
            <h1 class="game__title"><?= htmlspecialchars($game['name']) ?></h1>
            <p class="game__price"><?= number_format((float)$game['price'], 0, ',', ' ') ?> ₽</p>
            <p class="game__desc"><?= nl2br(htmlspecialchars($game['description'])) ?></p>
        </div>
    </div>

    <section class="reviews" data-game-id="<?= (int)$game['id'] ?>">
        <h2 class="reviews__title">📝 отзывы</h2>
        <div class="reviews__list" id="reviews-list"></div>

        <form class="reviews__form" id="reviews-form">
            <h3>оставить отзыв</h3>
            <label>никнейм
                <input type="text" name="nickname" required maxlength="100" placeholder="@nickname">
            </label>
            <div class="rating">
                <span class="rating__label">оценка</span>
                <div class="rating__stars" data-rating>
                    <button type="button" class="rating__star" data-value="1">☆</button>
                    <button type="button" class="rating__star" data-value="2">☆</button>
                    <button type="button" class="rating__star" data-value="3">☆</button>
                    <button type="button" class="rating__star" data-value="4">☆</button>
                    <button type="button" class="rating__star" data-value="5">☆</button>
                </div>
                <input type="hidden" name="rating" value="5" required>
            </div>
            <label>комментарий
                <textarea name="comment" required rows="4" placeholder="расскажи о своих впечатлениях..."></textarea>
            </label>
            <button type="submit">отправить</button>
        </form>
    </section>
</div>
<script src="script.js"></script>
</body>
</html>