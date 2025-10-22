# XAMPP MySQL Database Setup Guide

## Step 1: Setup XAMPP MySQL Database

1. **Start XAMPP**
   - Open XAMPP Control Panel
   - Start Apache and MySQL services

2. **Create Database**
   - Open phpMyAdmin (http://localhost/phpmyadmin)
   - Click "New" to create a new database
   - Name it: `brew_haven_db`
   - Click "Create"

3. **Import Database Schema**
   - In phpMyAdmin, select `brew_haven_db`
   - Click "Import" tab
   - Choose file: `database_setup.sql`
   - Click "Go" to import

## Step 2: Setup API Files

1. **Copy API Files**
   - Copy all files from `api/` folder to `D:\xammp\htdocs\LabAct\api\`
   - Make sure these files exist:
     - `api/db_connection.php`
     - `api/register.php`
     - `api/login.php`
     - `api/contact.php`
     - `api/order.php`
     - `api/orders.php`
     - `api/menu.php`

2. **Test API Endpoints**
   - Test register: `http://localhost/LabAct/api/register.php`
   - Test login: `http://localhost/LabAct/api/login.php`
   - Test menu: `http://localhost/LabAct/api/menu.php`

## Step 3: Update React App

1. **Update Database Import**
   - Change all imports from `localDB` to `mysqlDB`
   - Files to update:
     - `src/pages/Login.jsx`
     - `src/pages/Register.jsx`
     - `src/pages/Contact.jsx`
     - `src/pages/Order.jsx`
     - `src/pages/Account.jsx`

2. **Test the Application**
   - Start React dev server: `npm run dev`
   - Test registration, login, orders, and contact forms

## Step 4: Database Tables Created

- **users** - User accounts
- **menu_items** - Coffee shop menu
- **orders** - Customer orders
- **contacts** - Contact form messages

## Step 5: Sample Data

- Admin user: `admin@brewhaven.com` / `admin123`
- 9 menu items (Coffee, Non-Coffee, Pastries)

## Troubleshooting

1. **CORS Issues**
   - Make sure API files have proper CORS headers
   - Check that React app runs on port 5173

2. **Database Connection**
   - Verify MySQL is running in XAMPP
   - Check database name and credentials in `db_connection.php`

3. **API Not Found**
   - Ensure API files are in correct XAMPP directory
   - Check Apache is running

## Testing Commands

```bash
# Test API endpoints
curl -X POST http://localhost/LabAct/api/register.php \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"password123"}'

curl -X POST http://localhost/LabAct/api/login.php \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@brewhaven.com","password":"admin123"}'
```
