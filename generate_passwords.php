<?php
// Password hash generator for testing
// Run this script to generate proper password hashes

$passwords = [
    'admin123',
    'test123',
    'password123'
];

echo "Password Hashes for Database:\n";
echo "============================\n\n";

foreach ($passwords as $password) {
    $hash = password_hash($password, PASSWORD_DEFAULT);
    echo "Password: $password\n";
    echo "Hash: $hash\n\n";
}

echo "SQL Insert Statements:\n";
echo "======================\n\n";

$users = [
    ['Admin User', 'admin@brewhaven.com', 'admin123'],
    ['Test User', 'test@test.com', 'test123']
];

foreach ($users as $user) {
    $hash = password_hash($user[2], PASSWORD_DEFAULT);
    echo "INSERT INTO users (name, email, password) VALUES ('{$user[0]}', '{$user[1]}', '$hash');\n";
}
?>
