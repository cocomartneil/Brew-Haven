<?php
// Database initialization script for PostgreSQL
require_once 'db_connection.php';

try {
    // Create tables directly instead of reading from file
    $statements = [
        // Users table
        "CREATE TABLE IF NOT EXISTS users (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",
        
        // Menu items table
        "CREATE TABLE IF NOT EXISTS menu_items (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            price DECIMAL(10,2) NOT NULL,
            category VARCHAR(50) NOT NULL,
            description TEXT,
            image_url VARCHAR(500),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",
        
        // Orders table
        "CREATE TABLE IF NOT EXISTS orders (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            item_name VARCHAR(100) NOT NULL,
            quantity INTEGER NOT NULL,
            size VARCHAR(20) NOT NULL,
            special_instructions TEXT,
            total_price DECIMAL(10,2) NOT NULL,
            status VARCHAR(20) DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'preparing', 'ready', 'completed', 'cancelled')),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )",
        
        // Contact messages table
        "CREATE TABLE IF NOT EXISTS contacts (
            id SERIAL PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            email VARCHAR(100) NOT NULL,
            message TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )",
        
        // Insert sample menu items
        "INSERT INTO menu_items (name, price, category, description) VALUES
        ('Latte', 150.00, 'Coffee', 'Smooth espresso with steamed milk'),
        ('Cappuccino', 140.00, 'Coffee', 'Perfect blend of espresso, steamed milk & foam'),
        ('Americano', 120.00, 'Coffee', 'Rich espresso with hot water'),
        ('Hot Chocolate', 130.00, 'Non-Coffee', 'Rich and creamy hot chocolate'),
        ('Matcha Latte', 160.00, 'Non-Coffee', 'Premium matcha with steamed milk'),
        ('Chai Tea', 90.00, 'Non-Coffee', 'Spiced tea blend'),
        ('Croissant', 70.00, 'Pastries', 'Buttery, flaky pastry'),
        ('Blueberry Muffin', 85.00, 'Pastries', 'Blueberry muffin'),
        ('Cheesecake', 150.00, 'Pastries', 'Creamy New York style cheesecake')
        ON CONFLICT DO NOTHING",
        
        // Insert admin user
        "INSERT INTO users (name, email, password) VALUES
        ('Admin User', 'admin@brewhaven.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
        ON CONFLICT (email) DO NOTHING",
        
        // Insert test user
        "INSERT INTO users (name, email, password) VALUES
        ('Test User', 'test@test.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi')
        ON CONFLICT (email) DO NOTHING"
    ];
    
    $successCount = 0;
    $errorCount = 0;
    $errors = [];
    
    foreach ($statements as $statement) {
        try {
            $pdo->exec($statement);
            $successCount++;
        } catch (PDOException $e) {
            $errorCount++;
            $errors[] = $e->getMessage();
        }
    }
    
    echo json_encode([
        'success' => true,
        'message' => 'Database initialized successfully',
        'statements_executed' => $successCount,
        'errors' => $errorCount,
        'error_details' => $errors,
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
