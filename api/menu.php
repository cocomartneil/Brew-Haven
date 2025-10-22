<?php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    $itemName = $_GET['name'] ?? null;
    
    try {
        if ($itemName) {
            // Get specific menu item
            $stmt = $pdo->prepare("SELECT * FROM menu_items WHERE name = ?");
            $stmt->execute([$itemName]);
            $item = $stmt->fetch();
            
            if (!$item) {
                http_response_code(404);
                echo json_encode(['error' => 'Menu item not found.']);
                exit();
            }
            
            echo json_encode([
                'success' => true,
                'item' => $item
            ]);
        } else {
            // Get all menu items
            $stmt = $pdo->prepare("SELECT * FROM menu_items ORDER BY category, name");
            $stmt->execute();
            $items = $stmt->fetchAll();
            
            echo json_encode([
                'success' => true,
                'items' => $items
            ]);
        }
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
