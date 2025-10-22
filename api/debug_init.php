<?php
// Debug database initialization
require_once 'db_connection.php';

try {
    // Test simple table creation
    $testStatement = "CREATE TABLE IF NOT EXISTS test_table (id SERIAL PRIMARY KEY, name VARCHAR(50))";
    
    $result = $pdo->exec($testStatement);
    
    echo json_encode([
        'success' => true,
        'message' => 'Test table created',
        'result' => $result,
        'pdo_available' => isset($pdo),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
    
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => $e->getMessage(),
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}
?>
