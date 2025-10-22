<?php
// Database config (change these to your actual credentials)
$host = "localhost";
$dbname = "havendb";
$username = "root";
$password = "";
// Handle form submission
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Connect to DB
    try {
        $pdo = new PDO("mysql:host=$host;dbname=$dbname", $username, $password);
        $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        // Prepare & bind
        $stmt = $pdo->prepare("INSERT INTO orders (name, email, address, drink, size, notes)
VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->execute([
            $_POST['name'],
            $_POST['email'],
            $_POST['address'],
            $_POST['drink'],
            $_POST['size'],
            $_POST['notes']
        ]);
        // Redirect or confirm
        echo "<script>
alert('Thank you, {$_POST['name']}! Your order has been placed.');
window.location.href = 'index.html'; // Redirect to homepage or menu
</script>";
        exit();
    } catch (PDOException $e) {
        die("Database error: " . $e->getMessage());
    }
}
?>
<!DOCTYPE html>

<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Order Coffee - Coffee Shop</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: #fdf6f0;
            padding: 40px;
            max-width: 600px;
            margin: auto;
        }

        h1 {
            text-align: center;
            color: #7b3e19;
        }

        form {
            background-color: #fff;
            padding: 25px;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }

        label {
            display: block;
            margin-top: 15px;
            font-weight: bold;
        }

        input,
        select,
        textarea {
            width: 100%;
            padding: 10px;
            margin-top: 5px;
            border: 1px solid #ccc;
            border-radius: 5px;
        }

        button {
            margin-top: 20px;
            background-color: #d2691e;
            color: white;

            border: none;
            padding: 12px 20px;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }

        button:hover {
            background-color: #a0522d;
        }

        .back-button {
            display: inline-block;
            margin-top: 20px;
            background-color: #7b3e19;
            color: white;
            padding: 10px 20px;
            border-radius: 5px;
            text-decoration: none;
        }

        .back-button:hover {
            background-color: #5a2d0e;
        }
    </style>
</head>

<body>
    <h1>Order Your Coffee</h1>
    <form id="orderForm" method="POST" action="order.php">
        <label for="name">Full Name</label>
        <input type="text" id="name" name="name" placeholder="Neil Tabernilla" required>
        <label for="email">Email Address</label>
        <input type="email" id="email" name="email" placeholder="email@example.com" required>
        <label for="address">Delivery Address</label>
        <input type="text" id="address" name="address" placeholder="123 Gulod" required>
        <label for="drink">Selected Drink</label>
        <input type="text" id="drink" name="drink" readonly placeholder="Loading...">

        <label for="size">Select Size</label>
        <select id="size" name="size" required>
            <option value="">-- Choose a size --</option>
            <option value="small">Small</option>
            <option value="medium">Medium</option>
            <option value="large">Large</option>
        </select>
        <label for="notes">Special Instructions</label>
        <textarea id="notes" name="notes" rows="4" placeholder="Extra whipped cream,
almond milk, etc."></textarea>
        <button type="submit">Place Order</button>
    </form>

    <a href="javascript:history.back()" class="back-button">Back</a>
    <script>
        const params = new URLSearchParams(window.location.search);
        const selectedDrink = params.get("drink");
        const drinkInput = document.getElementById("drink");
        drinkInput.value = selectedDrink ? selectedDrink : "No drink selected";
    </script>
</body>

</html>