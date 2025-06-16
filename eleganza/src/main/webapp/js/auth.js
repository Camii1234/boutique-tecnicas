// Authentication Management
class AuthManager {
  constructor() {
    this.currentUser = this.loadCurrentUser()
    this.users = this.loadUsers()
  }

  // Load current user from localStorage
  loadCurrentUser() {
    const stored = localStorage.getItem("boutique_current_user")
    return stored ? JSON.parse(stored) : null
  }

  // Save current user to localStorage
  saveCurrentUser(user) {
    if (user) {
      localStorage.setItem("boutique_current_user", JSON.stringify(user))
    } else {
      localStorage.removeItem("boutique_current_user")
    }
    this.currentUser = user
  }

  // Load users from localStorage
  loadUsers() {
    const stored = localStorage.getItem("boutique_users")
    if (stored) {
      return JSON.parse(stored)
    }

    // Default admin user
    const defaultUsers = [
      {
        id: 1,
        name: "Administrador",
        email: "admin@eleganzaboutique.com",
        password: "admin123",
        role: "admin",
        phone: "+57 320 555 8899",
        street: "Calle 123 #45-67",
        city: "Bogotá",
        zipCode: "110111",
        country: "Colombia",
      },
    ]

    this.saveUsers(defaultUsers)
    return defaultUsers
  }

  // Save users to localStorage
  saveUsers(users = this.users) {
    localStorage.setItem("boutique_users", JSON.stringify(users))
  }

  // Login user
  login(email, password) {
    const user = this.users.find((u) => u.email === email && u.password === password)
    if (user) {
      this.saveCurrentUser(user)
      return { success: true, user }
    }
    return { success: false, message: "Credenciales incorrectas" }
  }

  // Register new user
  register(userData) {
    // Check if email already exists
    if (this.users.find((u) => u.email === userData.email)) {
      return { success: false, message: "El correo electrónico ya está registrado" }
    }

    const newUser = {
      id: Math.max(...this.users.map((u) => u.id), 0) + 1,
      ...userData,
      role: "customer",
    }

    this.users.push(newUser)
    this.saveUsers()
    this.saveCurrentUser(newUser)

    return { success: true, user: newUser }
  }

  // Logout user
  logout() {
    this.saveCurrentUser(null)
  }

  // Get current user
  getCurrentUser() {
    return this.currentUser
  }

  // Check if user is logged in
  isLoggedIn() {
    return this.currentUser !== null
  }

  // Check if user is admin
  isAdmin() {
    return this.currentUser && this.currentUser.role === "admin"
  }

  // Update user profile
  updateProfile(userData) {
    if (!this.currentUser) return { success: false, message: "No hay usuario logueado" }

    const userIndex = this.users.findIndex((u) => u.id === this.currentUser.id)
    if (userIndex !== -1) {
      this.users[userIndex] = { ...this.users[userIndex], ...userData }
      this.saveUsers()
      this.saveCurrentUser(this.users[userIndex])
      return { success: true, user: this.users[userIndex] }
    }

    return { success: false, message: "Usuario no encontrado" }
  }
}

// Create global instance
window.authManager = new AuthManager()
