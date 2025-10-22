// Database simulation using localStorage
class LocalDatabase {
  constructor() {
    this.dbName = 'brewHavenDB';
    this.init();
  }

  init() {
    // Initialize database if it doesn't exist
    if (!localStorage.getItem(this.dbName)) {
      const initialData = {
        users: [],
        orders: [],
        contacts: [],
        menuItems: [
          { id: 1, name: "Latte", price: 150, category: "Coffee" },
          { id: 2, name: "Cappuccino", price: 140, category: "Coffee" },
          { id: 3, name: "Americano", price: 120, category: "Coffee" },
          { id: 4, name: "Hot Chocolate", price: 130, category: "Non-Coffee" },
          { id: 5, name: "Matcha Latte", price: 160, category: "Non-Coffee" },
          { id: 6, name: "Chai Tea", price: 90, category: "Non-Coffee" },
          { id: 7, name: "Croissant", price: 70, category: "Pastries" },
          { id: 8, name: "Blueberry Muffin", price: 85, category: "Pastries" },
          { id: 9, name: "Cheesecake", price: 150, category: "Pastries" }
        ]
      };
      localStorage.setItem(this.dbName, JSON.stringify(initialData));
    }
  }

  getData() {
    return JSON.parse(localStorage.getItem(this.dbName));
  }

  saveData(data) {
    localStorage.setItem(this.dbName, JSON.stringify(data));
  }

  // User operations
  async registerUser(userData) {
    const data = this.getData();
    
    // Check if user already exists
    const existingUser = data.users.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email is already registered.');
    }

    // Create new user
    const newUser = {
      id: Date.now(),
      name: userData.name,
      email: userData.email,
      password: userData.password, // In real app, this would be hashed
      createdAt: new Date().toISOString()
    };

    data.users.push(newUser);
    this.saveData(data);
    
    return { id: newUser.id, name: newUser.name, email: newUser.email };
  }

  async loginUser(email, password) {
    const data = this.getData();
    const user = data.users.find(u => u.email === email && u.password === password);
    
    if (!user) {
      throw new Error('Invalid email or password.');
    }

    return { id: user.id, name: user.name, email: user.email };
  }

  async getUserById(id) {
    const data = this.getData();
    return data.users.find(user => user.id === id);
  }

  // Order operations
  async createOrder(orderData) {
    const data = this.getData();
    
    const newOrder = {
      id: Date.now(),
      userId: orderData.userId,
      itemName: orderData.itemName,
      quantity: orderData.quantity,
      size: orderData.size,
      specialInstructions: orderData.specialInstructions,
      totalPrice: orderData.totalPrice,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    data.orders.push(newOrder);
    this.saveData(data);
    
    return newOrder;
  }

  async getUserOrders(userId) {
    const data = this.getData();
    return data.orders.filter(order => order.userId === userId);
  }

  async getAllOrders() {
    const data = this.getData();
    return data.orders;
  }

  // Contact operations
  async saveContact(contactData) {
    const data = this.getData();
    
    const newContact = {
      id: Date.now(),
      name: contactData.name,
      email: contactData.email,
      message: contactData.message,
      createdAt: new Date().toISOString()
    };

    data.contacts.push(newContact);
    this.saveData(data);
    
    return newContact;
  }

  async getAllContacts() {
    const data = this.getData();
    return data.contacts;
  }

  // Menu operations
  async getMenuItems() {
    const data = this.getData();
    return data.menuItems;
  }

  async getMenuItemByName(name) {
    const data = this.getData();
    return data.menuItems.find(item => item.name === name);
  }

  // Admin operations
  async getDatabaseStats() {
    const data = this.getData();
    return {
      totalUsers: data.users.length,
      totalOrders: data.orders.length,
      totalContacts: data.contacts.length,
      totalRevenue: data.orders.reduce((sum, order) => sum + order.totalPrice, 0)
    };
  }

  // Clear all data (for testing)
  clearAllData() {
    localStorage.removeItem(this.dbName);
    this.init();
  }
}

// Create a singleton instance
const localDB = new LocalDatabase();

export default localDB;
