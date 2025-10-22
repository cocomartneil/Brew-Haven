<?php
// CORS test endpoint
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

echo json_encode([
    'success' => true,
    'message' => 'CORS test successful',
    'origin' => $origin,
    'allowed_origins' => $allowed_origins,
    'timestamp' => date('Y-m-d H:i:s')
]);
?>
