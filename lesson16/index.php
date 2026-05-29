<?php
    $title = "Маметов И.А. | Персональная страница";
    $heading = "Страница создана Маметовым Игорем Анатольевичем";
    $year = date("Y");

    function getTime() {
        $hours = (int)date("H");
        $min = (int)date("i");

        $hMod10 = $hours % 10;
        $hMod100 = $hours % 100;

        if ($hMod100 >= 11 && $hMod100 <= 19) {
            $hWord = "часов";
        } elseif ($hMod10 === 1) {
            $hWord = "час";
        } elseif ($hMod10 >= 2 && $hMod10 <= 4) {
            $hWord = "часа";
        } else {
            $hWord = "часов";
        }

        $minMod10 = $min % 10;
        $minMod100 = $min % 100;

        if ($minMod100 >= 11 && $minMod100 <= 19) {
            $minWord = "минут";
        } elseif ($minMod10 === 1) {
            $minWord = "минута";
        } elseif ($minMod10 >= 2 && $minMod10 <= 4) {
            $minWord = "минуты";
        } else {
            $minWord = "минут";
        }

        return "$hours $hWord $min $minWord";
    }

    $time = getTime();
?>

<!doctype html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title><?= $title ?></title>
    <style>
    @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;600&display=swap');

    body {
        background-color: #080808;
        color: #b8b8b8;
        font-family: 'Cormorant Garamond', Georgia, serif;
        margin: 0;
        padding: 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        background-image: radial-gradient(ellipse at top, #111 0%, #080808 100%);
    }

    .container {
        text-align: center;
        padding: 48px 40px;
        border: 1px solid #222;
        border-top: 2px solid #666;
        background: rgba(255,255,255,0.02);
        max-width: 680px;
        width: 90%;
    }

    h1 {
        font-size: 1.8rem;
        font-weight: 300;
        color: #ddd;
        letter-spacing: 0.08em;
        text-transform: uppercase;
        text-shadow: 0 0 20px rgba(200,200,200,0.15);
        margin-bottom: 32px;
        line-height: 1.5;
    }

    .divider {
        color: #444;
        letter-spacing: 0.5em;
        margin: 24px 0;
        font-size: 0.8rem;
    }

    .image-wrapper {
        margin: 28px auto;
        display: inline-block;
        border: 1px solid #222;
        padding: 6px;
        background: #0f0f0f;
    }

    .image-wrapper img {
        display: block;
        width: 320px;
        max-width: 100%;
        filter: contrast(1.1) saturate(0.8);
    }

    p {
        font-size: 1.1rem;
        color: #777;
        letter-spacing: 0.06em;
        margin: 6px 0;
    }
</style>
</head>
<body>
    <div class="container">
        <h1><?= $heading ?></h1>

        <div class="image-wrapper">
            <img src="mametov.jpg" alt="Маметов Игорь Анатольевич — дизайн йоу">
        </div>

        <p>Текущий год: <?= $year ?></p>
        <p>Текущее время: <?= $time ?></p>

    </div>
</body>
</html>