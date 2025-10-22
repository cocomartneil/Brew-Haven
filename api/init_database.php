<?php
// Database initialization script for PostgreSQL
require_once 'db_connection.php';

try {
    // Read the PostgreSQL schema file
    $sql = file_get_contents('database_setup_postgresql.sql');
    
    if ($sql === false) {
        throw new Exception('Could not read database schema file');
    }
    
    // Split the SQL into individual statements
    $statements = array_filter(array_map('trim', explode(';', $sql)));
    
    $successCount = 0;
    $errorCount = 0;
    
    foreach ($statements as $statement) {
        if (empty($statement) || strpos($statement, '--') === 0) {
            continue; // Skip empty statements and comments
        }
        
        try {
            $pdo->exec($statement);
            $successCount++;
        } catch (PDOException $e) {
            $errorCount++;
            error_log("SQL Error: " . $e->getMessage() . " - Statement: " . substr($statement, 0, 100));
        }
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Database initialized successfully',
        'statements_executed' => $successCount,
        'errors' => $errorCount,
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
