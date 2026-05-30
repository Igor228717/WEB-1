<?php
/*
 * API для работы с отзывами (AJAX)
 * Автор: [Маметов Игорь]
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/ReviewService.php';
try {
    $raw   = file_get_contents('php://input');
    $input = $raw ? json_decode($raw, true) : null;
    if (!is_array($input)) $input = $_POST;

    $action   = (string)($input['action'] ?? '');
    $reviews = new ReviewService(getPDO());
    $result   = $reviews->doReviewAction($action, $input);
    echo json_encode($result, JSON_UNESCAPED_UNICODE);
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['ok' => false, 'error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);
}