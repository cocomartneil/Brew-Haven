<?php
// Database config
$host = "localhost";
$dbname = "havendb";
$username = "root";
$password = "";
// Initialize message variables
$success = "";

$error = "";
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Get POST data and sanitize
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $pass = $_POST['password'];
    $confirmPass = $_POST['confirmPassword'];
    // Validate passwords match
    if ($pass !== $confirmPass) {
        $error = "Passwords do not match.";
    } else {
        try {
            // Connect to DB
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Check if email already exists
            $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ?");
            $stmt->execute([$email]);
            if ($stmt->rowCount() > 0) {
                $error = "Email is already registered.";
            } else {
                // Hash the password
                $hashedPassword = password_hash($pass, PASSWORD_DEFAULT);
                // Insert user into DB
                $stmt = $pdo->prepare("INSERT INTO users (name, email, password) VALUES (?, ?,
?)");
                $stmt->execute([$name, $email, $hashedPassword]);
                $success = "Account created successfully! You can now <a
href='login.html'>login</a>.";
            }
        } catch (PDOException $e) {
            $error = "Database error: " . $e->getMessage();
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Register - Brew Haven</title>
    <link rel="stylesheet" href="style.css" />
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fdf6f0;
            margin: 0;
            padding: 0;
        }

        .register-container {
            max-width: 400px;
            margin: 80px auto;
            background-color: #fff;
            padding: 30px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        .register-container h2 {
            text-align: center;
            color: #7b3e19;
            margin-bottom: 25px;
        }

        .register-container input {
            width: 100%;
            padding: 12px;
            margin: 10px 0 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        .register-container button {
            width: 100%;
            background-color: #d2691e;
            color: white;
            border: none;
            padding: 12px;
            font-size: 16px;
            border-radius: 5px;

            cursor: pointer;
        }

        .register-container button:hover {
            background-color: #a0522d;
        }

        .register-container p {
            text-align: center;
            margin-top: 20px;
            font-size: 14px;
        }

        .register-container a {
            color: #d2691e;
            text-decoration: none;
        }

        .register-container a:hover {
            text-decoration: underline;
        }

        /* Message styles */
        .error {
            color: red;
            text-align: center;
            margin-bottom: 15px;
        }

        .success {
            color: green;
            text-align: center;
            margin-bottom: 15px;
        }
    </style>
</head>

<body>
    <div class="register-container">
        <h2>Create Your Account</h2>
        <?php if ($error): ?>
            <div class="error"><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <?php if ($success): ?>
            <div class="success"><?= $success ?></div>
        <?php endif; ?>
        <form id="registerForm" method="POST" action="register.php" <?= $success ?
            'style="display:none;"' : '' ?>>
            <input type="text" id="name" name="name" placeholder="Full Name" required
                value="<?= isset($name) ? htmlspecialchars($name) : '' ?>">
            <input type="email" id="email" name="email" placeholder="Email address" required
                value="<?= isset($email) ? htmlspecialchars($email) : '' ?>">
            <input type="password" id="password" name="password" placeholder="Password" required>
            <input type="password" id="confirmPassword" name="confirmPassword" placeholder="Confirm Password" required>
            <button type="submit">Register</button>
        </form>
        <p>Already have an account? <a href="login.php">Login here</a></p>
    </div>
</body>

</html>