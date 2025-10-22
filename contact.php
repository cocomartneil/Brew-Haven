<?php
// Initialize variables for error and success messages
$errorMessage = '';
$successMessage = '';
// Database connection settings
$host = "localhost";
$dbname = "havendb";
$username = "root";
$password = "";
// Process the form when it is submitted
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Collect form data
    $name = trim($_POST['name']);
    $email = trim($_POST['email']);
    $message = trim($_POST['message']);
    // Simple form validation
    if (empty($name) || empty($email) || empty($message)) {
        $errorMessage = 'All fields are required.';
    } elseif (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errorMessage = 'Please enter a valid email address.';
    } else {
        // Try to insert the data into the database
        try {
            // Connect to DB
            $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
            $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
            // Prepare SQL statement to insert data
            $stmt = $pdo->prepare("INSERT INTO contacts (name, email, message) VALUES (?, ?,
?)");
            $stmt->execute([$name, $email, $message]);
            // If insertion is successful, show success message
            $successMessage = "Thank you, $name! Your message has been sent. We'll get back to
you at: $email";
        } catch (PDOException $e) {
            // Catch database error and show it
            $errorMessage = "Database error: " . $e->getMessage();
        }

    }
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Contact - Brew Haven</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>
    <header>
        <div class="logo">Brew Haven</div>
        <nav>
            <a href="index.html">Home</a>
            <a href="menu.html">Menu</a>
            <a href="about.html">About</a>
            <a href="contact.php" class="active">Contact</a>
        </nav>
    </header>
    <section class="about">
        <h2>Contact Us</h2>
        <p>We’d love to hear from you! Fill out the form below:</p>
        <?php if ($errorMessage): ?>
            <div class="error-message" style="color: red;">
                <?php echo $errorMessage; ?>
            </div>
        <?php endif; ?>
        <?php if ($successMessage): ?>
            <div class="success-message" style="color: green;">
                <?php echo $successMessage; ?>
            </div>
        <?php endif; ?>
        <form action="contact.php" method="POST" class="contact-form" id="contactForm">
            <input type="text" name="name" placeholder="Your Name" required value="<?=
                htmlspecialchars($name ?? '') ?>">

            <input type="email" name="email" placeholder="Your Email" required value="<?=
                htmlspecialchars($email ?? '') ?>">
            <textarea name="message" rows="5" placeholder="Your Message" required><?=
                htmlspecialchars($message ?? '') ?></textarea>
            <button type="submit" class="btn">Send Message</button>
        </form>
    </section>
    <footer>
        <p>&copy; 2025 Brew Haven Coffee Shop </p>
    </footer>
</body>

</html>