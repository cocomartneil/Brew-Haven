<?php
// Database configuration for both local development and Render deployment
$host = $_ENV['DB_HOST'] ?? 'localhost';
$dbname = $_ENV['MYSQL_DATABASE'] ?? 'brew_haven_db';
$username = $_ENV['DB_USERNAME'] ?? 'root';
$password = $_ENV['MYSQL_ROOT_PASSWORD'] ?? '';

// For Render deployment, use the internal database URL
if (isset($_ENV['DATABASE_URL'])) {
    $url = parse_url($_ENV['DATABASE_URL']);
    $host = $url['host'];
    $dbname = ltrim($url['path'], '/');
    $username = $url['user'];
    $password = $url['pass'];
    $port = $url['port'] ?? 3306;
    $host = $host . ':' . $port;
}

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => 'Database connection failed: ' . $e->getMessage()]);
    exit();
}

// Set CORS headers for React app
header('Content-Type: application/json');
// Allow both local development and Netlify deployment
$allowed_origins = [
    'http://localhost:5173',  // Local development
    'https://your-netlify-app.netlify.app',  // Replace with your actual Netlify URL
    'https://brew-haven.netlify.app'  // Example Netlify URL
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
?>
