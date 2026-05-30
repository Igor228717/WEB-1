<?php
http_response_code(404);
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>404 — игра не найдена</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Roboto+Mono&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
</head>
<body>
<div class="container error-page">
    <div class="error-code">404</div>
    <div class="error-title">GAME NOT FOUND</div>
    <div class="error-message">К сожалению, картридж с этой игрой потерялся в подсобке.</div>
    <a class="error-link" href="index.php">← вернуться в каталог</a>
</div>
</body>
</html>