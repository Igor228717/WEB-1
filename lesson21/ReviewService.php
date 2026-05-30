<?php
/*
 * CRUD для отзывов к играм
 * Автор: [ТВОЁ ИМЯ]
 */
class ReviewService
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function doReviewAction(string $action, array $params): array
    {
        try {
            return match ($action) {
                'create' => $this->create($params),
                'read'   => $this->read((int)($params['id'] ?? 0)),
                'update' => $this->update($params),
                'delete' => $this->delete((int)($params['id'] ?? 0)),
                'list'   => $this->list((int)($params['game_id'] ?? 0)),
                default  => ['ok' => false, 'error' => "Неизвестное действие: $action"],
            };
        } catch (Throwable $e) {
            return ['ok' => false, 'error' => $e->getMessage()];
        }
    }
    private function list(int $gameId): array
    {
        if ($gameId <= 0) return ['ok' => false, 'error' => 'Неверный ID игры'];
        $stmt = $this->pdo->prepare(
            'SELECT id, game_id, nickname, rating, comment, created_at
             FROM reviews WHERE game_id = ? ORDER BY created_at DESC'
        );
        $stmt->execute([$gameId]);
        return ['ok' => true, 'data' => $stmt->fetchAll()];
    }
    private function create(array $p): array
    {
        $gameId  = (int)($p['game_id'] ?? 0);
        $nickname = trim((string)($p['nickname'] ?? ''));
        $rating   = (int)($p['rating'] ?? 0);
        $comment  = trim((string)($p['comment'] ?? ''));

        if ($gameId <= 0 || $nickname === '' || $rating < 1 || $rating > 5 || $comment === '') {
            return ['ok' => false, 'error' => 'Заполни все поля'];
        }

        $stmt = $this->pdo->prepare(
            'INSERT INTO reviews (game_id, nickname, rating, comment) VALUES (?, ?, ?, ?)'
        );
        $stmt->execute([$gameId, $nickname, $rating, $comment]);
        return ['ok' => true, 'id' => (int)$this->pdo->lastInsertId()];
    }
    private function read(int $id): array
    {
        $stmt = $this->pdo->prepare('SELECT * FROM reviews WHERE id = ?');
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ? ['ok' => true, 'data' => $row] : ['ok' => false, 'error' => 'Отзыв не найден'];
    }
    private function update(array $p): array
    {
        $id      = (int)($p['id'] ?? 0);
        $rating  = (int)($p['rating'] ?? 0);
        $comment = trim((string)($p['comment'] ?? ''));

        if ($id <= 0 || $rating < 1 || $rating > 5 || $comment === '') {
            return ['ok' => false, 'error' => 'Неверные данные'];
        }
        $stmt = $this->pdo->prepare('UPDATE reviews SET rating = ?, comment = ? WHERE id = ?');
        $stmt->execute([$rating, $comment, $id]);
        return ['ok' => true, 'affected' => $stmt->rowCount()];
    }
    private function delete(int $id): array
    {
        if ($id <= 0) return ['ok' => false, 'error' => 'Неверный ID'];
        $stmt = $this->pdo->prepare('DELETE FROM reviews WHERE id = ?');
        $stmt->execute([$id]);
        return ['ok' => true, 'affected' => $stmt->rowCount()];
    }
}