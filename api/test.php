<?php
require_once 'db_connection.php';

// Simple test endpoint to check if API is working
echo json_encode([
    'success' => true,
    'message' => 'API is working!',
    'timestamp' => date('Y-m-d H:i:s'),
    'database_connected' => isset($pdo) ? true : false
]);
?>
