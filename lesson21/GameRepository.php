<?php
/*
 * Класс для работы с играми
 * Автор: [Маметов Игорь]
 */
class GameRepository
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }
    public function fetchAll(): array
    {
        return $this->pdo
            ->query('SELECT id, name, console, image, price, year, description FROM games ORDER BY year DESC')
            ->fetchAll();
    }
    public function fetchById(int $id): ?array
    {
        $stmt = $this->pdo->prepare(
            'SELECT id, name, console, image, price, year, description FROM games WHERE id = ?'
        );
        $stmt->execute([$id]);
        $row = $stmt->fetch();
        return $row ?: null;
    }
}