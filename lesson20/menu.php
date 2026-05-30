<?php
class Menu
{
    private PDO $pdo;

    public function __construct(PDO $pdo)
    {
        $this->pdo = $pdo;
    }

    public function fetchAll(): array
    {
        $sql = 'SELECT id, parent_id, name, sort_order
                FROM menu_items
                ORDER BY parent_id IS NULL DESC, parent_id, sort_order';

        return $this->pdo->query($sql)->fetchAll();
    }

    public function buildTree(array $items): array
    {
        $indexed = [];
        $tree    = [];

        foreach ($items as $item) {
            $item['children'] = [];
            $indexed[$item['id']] = $item;
        }

        foreach ($indexed as $id => &$node) {
            if ($node['parent_id'] === null) {
                $tree[] = &$node;
            } else {
                $indexed[$node['parent_id']]['children'][] = &$node;
            }
        }
        unset($node);

        return $tree;
    }

    public function render(array $nodes): string
    {
        $html = '';
        foreach ($nodes as $node) {
            $html .= $this->renderNode($node);
        }
        return $html;
    }

    private function renderNode(array $node): string
    {
        $name = htmlspecialchars($node['name'], ENT_QUOTES, 'UTF-8');
        $hasChildren = !empty($node['children']);

        if ($hasChildren) {
            $childrenHTML = '';
            foreach ($node['children'] as $child) {
                $childrenHTML .= $this->renderNode($child);
            }
            return <<<HTML
                <div class="list-item list-item_open" data-parent>
                    <div class="list-item__inner">
                        <img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" data-open>
                        <img class="list-item__folder" src="img/folder.png" alt="folder">
                        <span>{$name}</span>
                    </div>
                    <div class="list-item__items">
                        {$childrenHTML}
                    </div>
                </div>
            HTML;
        }

        return <<<HTML
            <div class="list-item" data-parent>
                <div class="list-item__inner">
                    <img class="list-item__arrow" src="img/chevron-down.png" alt="chevron-down" style="visibility: hidden;">
                    <img class="list-item__folder" src="img/folder.png" alt="folder">
                    <span>{$name}</span>
                </div>
                <div class="list-item__items"></div>
            </div>
        HTML;
    }
}