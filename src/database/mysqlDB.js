// MySQL Database connection and operations
class MySQLDatabase {
  constructor() {
    // Use environment variable for API URL, fallback to localhost for development
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost/LabAct/api';
  }

  // Generic API call method
  async apiCall(endpoint, method = 'GET', data = null) {
    try {
      const options = {
        method: method,
        headers: {
          'Content-Type': 'application/json',
        },
      };

      if (data) {
        options.body = JSON.stringify(data);
      }

      const response = await fetch(`${this.baseURL}/${endpoint}`, options);
      
      // Always try to parse JSON response, even for error status codes
      let result;
      try {
        result = await response.json();
      } catch (parseError) {
        // If JSON parsing fails, create a basic error object
        result = { error: `Server error: ${response.status}` };
      }
      
      // Handle different HTTP status codes
      if (response.status === 401) {
        // Authentication failed - return the error message
        throw new Error(result.error || 'Invalid email or password');
      } else if (response.status === 400) {
        // Bad request - return the error message
        throw new Error(result.error || 'Bad request');
      } else if (response.status === 404) {
        // Not found - return the error message
        throw new Error(result.error || 'Not found');
      } else if (response.status === 500) {
        // Server error - return the error message
        throw new Error(result.error || 'Server error');
      } else if (!response.ok) {
        // Other HTTP errors
        throw new Error(result.error || `HTTP error! status: ${response.status}`);
      }

      return result;
    } catch (error) {
      console.error('API call failed:', error);
      throw error;
    }
  }

  // User operations
  async registerUser(userData) {
    return await this.apiCall('register.php', 'POST', userData);
  }

  async loginUser(email, password) {
    return await this.apiCall('login.php', 'POST', { email, password });
  }

  async getUserById(id) {
    return await this.apiCall(`user.php?id=${id}`);
  }

  // Order operations
  async createOrder(orderData) {
    return await this.apiCall('order.php', 'POST', orderData);
  }

  async getUserOrders(userId) {
    return await this.apiCall(`orders.php?user_id=${userId}`);
  }

  async getAllOrders() {
    return await this.apiCall('orders.php');
  }

  // Contact operations
  async saveContact(contactData) {
    return await this.apiCall('contact.php', 'POST', contactData);
  }

  async getAllContacts() {
    return await this.apiCall('contacts.php');
  }

  // Menu operations
  async getMenuItems() {
    return await this.apiCall('menu.php');
  }

  async getMenuItemByName(name) {
    const response = await this.apiCall(`menu.php?name=${encodeURIComponent(name)}`);
    return response.item; // Return just the item object
  }

  // Admin operations
  async getDatabaseStats() {
    return await this.apiCall('admin.php');
  }
}

// Create a singleton instance
const mysqlDB = new MySQLDatabase();

export default mysqlDB;
