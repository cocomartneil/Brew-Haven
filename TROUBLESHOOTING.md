# Troubleshooting 401 Error

## Quick Fix Steps:

### 1. Test API Connection
Open in browser: `http://localhost/LabAct/api/test.php`
Should show: `{"success":true,"message":"API is working!"}`

### 2. Check Database Setup
1. Open phpMyAdmin: `http://localhost/phpmyadmin`
2. Select database: `brew_haven_db`
3. Check if `users` table exists
4. Check if admin user exists:
   ```sql
   SELECT * FROM users WHERE email = 'admin@brewhaven.com';
   ```

### 3. Generate New Password Hashes
1. Run: `php generate_passwords.php`
2. Copy the generated INSERT statements
3. Run them in phpMyAdmin to create users with proper password hashes

### 4. Test Login with Debug Endpoint
1. Use debug endpoint: `http://localhost/LabAct/api/login_debug.php`
2. Check browser console for detailed error messages
3. Check XAMPP error logs for PHP errors

### 5. Manual Database Setup
If automatic setup failed, run these SQL commands in phpMyAdmin:

```sql
-- Create database
CREATE DATABASE IF NOT EXISTS brew_haven_db;
USE brew_haven_db;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert admin user (password: admin123)
INSERT INTO users (name, email, password) VALUES
('Admin User', 'admin@brewhaven.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi');
```

### 6. Test Credentials
Try these credentials in the login form:
- Email: `admin@brewhaven.com`
- Password: `admin123`

### 7. Check CORS Issues
Make sure your React app is running on `http://localhost:5173`
The API CORS headers are set for this port.

### 8. Common Issues:
- **Database not created**: Run the SQL setup manually
- **Wrong password hash**: Generate new hashes with `generate_passwords.php`
- **CORS errors**: Check browser console for CORS issues
- **PHP errors**: Check XAMPP error logs
- **File permissions**: Make sure API files are readable by Apache

### 9. Debug Steps:
1. Check if XAMPP Apache and MySQL are running
2. Test API endpoint directly in browser
3. Check browser Network tab for request details
4. Check XAMPP error logs
5. Verify database connection in phpMyAdmin
