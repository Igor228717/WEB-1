<?php
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/Menu.php';

try {
    $menu  = new Menu(getPDO());
    $items = $menu->fetchAll();        
    $tree  = $menu->buildTree($items); 
    $html  = $menu->render($tree);  
} catch (PDOException $e) {
    die('Ошибка БД: ' . htmlspecialchars($e->getMessage()));
}
?>
<!DOCTYPE html>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Летний каталог 2026</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="list-items" id="list-items">
        <?= $html ?>
    </div>
    <script type="module" src="script.js"></script>
</body>
</html>