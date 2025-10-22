<?php
// Set CORS headers first
header('Content-Type: application/json');

// Allow both local development and Netlify deployment
$allowed_origins = [
    'http://localhost:5173',  // Local development
    'https://brewhaventabernilla.netlify.app'  // Your actual Netlify URL
];

$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if (in_array($origin, $allowed_origins)) {
    header('Access-Control-Allow-Origin: ' . $origin);
} else {
    header('Access-Control-Allow-Origin: *'); // For development
}

header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

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
