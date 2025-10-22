<?php
// Debug version of login.php
error_reporting(E_ALL);
ini_set('display_errors', 1);

require_once 'db_connection.php';

// Set CORS headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    
    // Debug: Log the received data
    error_log("Login attempt: " . json_encode($input));
    
    $email = trim($input['email'] ?? '');
    $password = $input['password'] ?? '';
    
    // Validation
    if (empty($email) || empty($password)) {
        http_response_code(400);
        echo json_encode(['error' => 'Email and password are required.']);
        exit();
    }
    
    try {
        // Get user by email
        $stmt = $pdo->prepare("SELECT id, name, email, password FROM users WHERE email = ?");
        $stmt->execute([$email]);
        $user = $stmt->fetch();
        
        // Debug: Log user found
        error_log("User found: " . ($user ? "Yes" : "No"));
        
        if (!$user) {
            http_response_code(401);
            echo json_encode(['error' => 'User not found.']);
            exit();
        }
        
        // Debug: Check password verification
        $passwordValid = password_verify($password, $user['password']);
        error_log("Password valid: " . ($passwordValid ? "Yes" : "No"));
        
        if (!$passwordValid) {
            http_response_code(401);
            echo json_encode(['error' => 'Invalid password.']);
            exit();
        }
        
        echo json_encode([
            'success' => true,
            'message' => 'Login successful.',
            'user' => [
                'id' => $user['id'],
                'name' => $user['name'],
                'email' => $user['email']
            ]
        ]);
        
    } catch (PDOException $e) {
        error_log("Database error: " . $e->getMessage());
        http_response_code(500);
        echo json_encode(['error' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed.']);
}
?>
