<?php
require_once 'db_connection.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    $userId = $input['userId'] ?? null;
    $itemName = trim($input['itemName'] ?? '');
    $quantity = $input['quantity'] ?? 1;
    $size = trim($input['size'] ?? 'Regular');
    $specialInstructions = trim($input['specialInstructions'] ?? '');
    $totalPrice = $input['totalPrice'] ?? 0;
    
    // Validation
    if (!$userId || empty($itemName) || $quantity < 1 || $totalPrice <= 0) {
        http_response_code(400);
        echo json_encode(['error' => 'Invalid order data.']);
        exit();
    }
    
    try {
        // Insert order
        $stmt = $pdo->prepare("INSERT INTO orders (user_id, item_name, quantity, size, special_instructions, total_price) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([$userId, $itemName, $quantity, $size, $specialInstructions, $totalPrice]);
        
        $orderId = $pdo->lastInsertId();
        
        echo json_encode([
            'success' => true,
            'message' => 'Order placed successfully.',
            'order' => [
                'id' => $orderId,
                'user_id' => $userId,
                'item_name' => $itemName,
                'quantity' => $quantity,
                'size' => $size,
                'special_instructions' => $specialInstructions,
                'total_price' => $totalPrice,
                'status' => 'pending',
                'created_at' => date('Y-m-d H:i:s')
            ]
        ]);
        
    } catch (PDOException $e) {
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
