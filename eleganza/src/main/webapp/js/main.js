// Main Application Logic
class BoutiqueApp {
  constructor() {
    this.init()
  }

  init() {
    // Initialize all managers
    this.setupEventListeners()
    this.updateUserInterface()
    this.loadFeaturedProducts()

    // Initialize cart display
    if (window.cartManager) {
      window.cartManager.updateCartDisplay()
    }
  }

  setupEventListeners() {
    // Mobile menu toggle
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")
    const mobileMenu = document.getElementById("mobileMenu")

    if (mobileMenuBtn && mobileMenu) {
      mobileMenuBtn.addEventListener("click", () => {
        this.toggleMobileMenu()
      })
    }

    // Cart dropdown toggle
    const cartBtn = document.getElementById("cartBtn")
    const cartDropdown = document.getElementById("cartDropdown")

    if (cartBtn && cartDropdown) {
      cartBtn.addEventListener("click", (e) => {
        e.stopPropagation()
        cartDropdown.classList.toggle("active")
      })

      document.addEventListener("click", (e) => {
        if (!cartBtn.contains(e.target) && !cartDropdown.contains(e.target)) {
          cartDropdown.classList.remove("active")
        }
      })
    }

    // Checkout button
    const cartCheckout = document.getElementById("cartCheckout")
    if (cartCheckout) {
      cartCheckout.addEventListener("click", () => {
        if (window.checkoutManager) {
          window.checkoutManager.startCheckout()
        }
      })
    }

    // Modal event listeners
    this.setupModalEventListeners()

    // Form event listeners
    this.setupFormEventListeners()

    // Product filters (for products page)
    this.setupProductFilters()
  }

  setupModalEventListeners() {
    // Login modal
    const loginBtn = document.getElementById("loginBtn")
    const mobileLoginBtn = document.getElementById("mobileLoginBtn")
    const loginModal = document.getElementById("loginModal")
    const closeLoginModal = document.getElementById("closeLoginModal")

    if (loginBtn && loginModal) {
      loginBtn.addEventListener("click", () => window.openModal(loginModal))
    }
    if (mobileLoginBtn && loginModal) {
      mobileLoginBtn.addEventListener("click", () => {
        this.toggleMobileMenu()
        window.openModal(loginModal)
      })
    }
    if (closeLoginModal && loginModal) {
      closeLoginModal.addEventListener("click", () => window.closeModal(loginModal))
    }

    // Register modal
    const registerBtn = document.getElementById("registerBtn")
    const mobileRegisterBtn = document.getElementById("mobileRegisterBtn")
    const registerModal = document.getElementById("registerModal")
    const closeRegisterModal = document.getElementById("closeRegisterModal")

    if (registerBtn && registerModal) {
      registerBtn.addEventListener("click", () => window.openModal(registerModal))
    }
    if (mobileRegisterBtn && registerModal) {
      mobileRegisterBtn.addEventListener("click", () => {
        this.toggleMobileMenu()
        window.openModal(registerModal)
      })
    }
    if (closeRegisterModal && registerModal) {
      closeRegisterModal.addEventListener("click", () => window.closeModal(registerModal))
    }

    // Checkout modal
    const checkoutModal = document.getElementById("checkoutModal")
    const closeCheckoutModal = document.getElementById("closeCheckoutModal")

    if (closeCheckoutModal && checkoutModal) {
      closeCheckoutModal.addEventListener("click", () => {
        window.closeModal(checkoutModal)
        if (window.checkoutManager) {
          window.checkoutManager.reset()
        }
      })
    }

    // Modal switching
    const switchToRegister = document.getElementById("switchToRegister")
    const switchToLogin = document.getElementById("switchToLogin")

    if (switchToRegister) {
      switchToRegister.addEventListener("click", (e) => {
        e.preventDefault()
        window.closeModal(loginModal)
        window.openModal(registerModal)
      })
    }

    if (switchToLogin) {
      switchToLogin.addEventListener("click", (e) => {
        e.preventDefault()
        window.closeModal(registerModal)
        window.openModal(loginModal)
      })
    }

    // Close modals on overlay click
    document.querySelectorAll(".modal-overlay").forEach((overlay) => {
      overlay.addEventListener("click", (e) => {
        if (e.target === overlay) {
          window.closeModal(overlay)
        }
      })
    })
  }

  setupFormEventListeners() {
    // Login form
    const loginForm = document.getElementById("loginForm")
    if (loginForm) {
      loginForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleLogin(e)
      })
    }

    // Register form
    const registerForm = document.getElementById("registerForm")
    if (registerForm) {
      registerForm.addEventListener("submit", (e) => {
        e.preventDefault()
        this.handleRegister(e)
      })
    }
  }

  setupProductFilters() {
    const categoryFilter = document.getElementById("categoryFilter")
    const sortFilter = document.getElementById("sortFilter")

    if (categoryFilter) {
      categoryFilter.addEventListener("change", () => this.loadProducts())
    }

    if (sortFilter) {
      sortFilter.addEventListener("change", () => this.loadProducts())
    }
  }

  toggleMobileMenu() {
    const mobileMenu = document.getElementById("mobileMenu")
    const mobileMenuBtn = document.getElementById("mobileMenuBtn")

    if (mobileMenu && mobileMenuBtn) {
      mobileMenu.classList.toggle("active")
      const icon = mobileMenuBtn.querySelector("i")
      if (mobileMenu.classList.contains("active")) {
        icon.classList.remove("fa-bars")
        icon.classList.add("fa-times")
      } else {
        icon.classList.remove("fa-times")
        icon.classList.add("fa-bars")
      }
    }
  }

  updateUserInterface() {
    const loginBtn = document.getElementById("loginBtn")
    const registerBtn = document.getElementById("registerBtn")
    const userInfo = document.getElementById("userInfo")
    const userName = document.getElementById("userName")
    const adminLink = document.getElementById("adminLink")

    const currentUser = window.authManager.getCurrentUser()

    if (currentUser) {
      if (loginBtn) loginBtn.style.display = "none"
      if (registerBtn) registerBtn.style.display = "none"
      if (userInfo) userInfo.classList.add("active")
      if (userName) userName.textContent = currentUser.name

      // Show admin link if user is admin
      if (adminLink && window.authManager.isAdmin()) {
        adminLink.style.display = "block"
        adminLink.href = window.location.pathname.includes("/pages/") ? "admin.jsp" : "pages/admin.jsp"
      }
    } else {
      if (loginBtn) loginBtn.style.display = "flex"
      if (registerBtn) registerBtn.style.display = "flex"
      if (userInfo) userInfo.classList.remove("active")
      if (adminLink) adminLink.style.display = "none"
    }
  }

  handleLogin(e) {
    const email = document.getElementById("loginEmail").value
    const password = document.getElementById("loginPassword").value

    const result = window.authManager.login(email, password)

    if (result.success) {
      window.showNotification("¡Bienvenido de vuelta!", "success")
      window.closeModal(document.getElementById("loginModal"))
      e.target.reset()
      this.updateUserInterface()
    } else {
      window.showNotification(result.message, "error")
    }
  }

  handleRegister(e) {
    const password = document.getElementById("registerPassword").value
    const confirmPassword = document.getElementById("confirmPassword").value

    if (password !== confirmPassword) {
      window.showNotification("Las contraseñas no coinciden.", "error")
      return
    }

    const userData = {
      name: document.getElementById("fullName").value,
      email: document.getElementById("registerEmail").value,
      phone: document.getElementById("phone").value,
      street: document.getElementById("street").value,
      city: document.getElementById("city").value,
      zipCode: document.getElementById("zipCode").value,
      country: document.getElementById("country").value,
      password: password,
    }

    const result = window.authManager.register(userData)

    if (result.success) {
      window.showNotification("¡Registro exitoso! Bienvenido a Boutique Eleganza.", "success")
      window.closeModal(document.getElementById("registerModal"))
      e.target.reset()
      this.updateUserInterface()
    } else {
      window.showNotification(result.message, "error")
    }
  }

  loadFeaturedProducts() {
    const featuredGrid = document.getElementById("featuredProductsGrid")
    if (!featuredGrid) return

    const featuredProducts = window.productsManager.getFeaturedProducts()
    this.renderProducts(featuredProducts, featuredGrid)
  }

  loadProducts() {
    const productsGrid = document.getElementById("productsGrid")
    if (!productsGrid) return

    let products = window.productsManager.getActiveProducts()

    // Apply filters
    const categoryFilter = document.getElementById("categoryFilter")
    const sortFilter = document.getElementById("sortFilter")

    if (categoryFilter && categoryFilter.value !== "all") {
      products = products.filter((p) => p.category === categoryFilter.value)
    }

    if (sortFilter) {
      products = window.productsManager.sortProducts(products, sortFilter.value)
    }

    this.renderProducts(products, productsGrid)
  }

  renderProducts(products, container) {
    container.innerHTML = ""

    if (products.length === 0) {
      container.innerHTML = `
        <div class="empty-state" style="grid-column: 1 / -1;">
          <i class="fas fa-search"></i>
          <h3>No se encontraron productos</h3>
          <p>No hay productos que coincidan con los criterios seleccionados.</p>
        </div>
      `
      return
    }

    products.forEach((product) => {
      const productCard = document.createElement("div")
      productCard.className = "product-card"
      productCard.innerHTML = `
        <div class="product-image-container">${product.icon}</div>
        <div class="product-info">
          <h4 class="product-name">${product.name}</h4>
          <div class="product-price">$${product.price.toLocaleString()}</div>
          <div class="size-selector">
            <label>Selecciona tu talla:</label>
            <div class="size-options">
              ${product.sizes
                .map(
                  (size) =>
                    `<div class="size-option" onclick="window.cartManager.selectSize(${product.id}, '${size}')">${size}</div>`,
                )
                .join("")}
            </div>
          </div>
          <button class="btn btn-primary product-add-to-cart" onclick="window.addToCart(${product.id})">
            Agregar al Carrito
          </button>
        </div>
      `
      container.appendChild(productCard)
    })
  }
}

// Global utility functions
window.openModal = (modal) => {
  modal.classList.add("active")
  document.body.style.overflow = "hidden"
}

window.closeModal = (modal) => {
  modal.classList.remove("active")
  document.body.style.overflow = ""
}

window.showNotification = (message, type = "success") => {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.innerHTML = `
    <i class="fas ${type === "success" ? "fa-check-circle" : type === "error" ? "fa-exclamation-circle" : "fa-info-circle"}"></i>
    <span style="margin-left: 0.5rem;">${message}</span>
  `
  document.body.appendChild(notification)

  setTimeout(() => notification.classList.add("show"), 100)
  setTimeout(() => {
    notification.classList.remove("show")
    setTimeout(() => notification.remove(), 300)
  }, 3000)
}

window.logout = () => {
  window.authManager.logout()
  window.showNotification("Sesión cerrada correctamente", "info")

  // Redirect to home if on admin page
  if (window.location.pathname.includes("admin.jsp")) {
    window.location.href = "../index.jsp"
  } else {
    window.location.reload()
  }
}

window.addToCart = (productId) => {
  try {
    const selectedSize = window.cartManager.getSelectedSize(productId)
    window.cartManager.addToCart(productId, selectedSize)
    window.showNotification("¡Producto agregado al carrito!", "success")
  } catch (error) {
    window.showNotification(error.message, "error")
  }
}

// Initialize app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.boutiqueApp = new BoutiqueApp()

  // Load products if on products page
  if (document.getElementById("productsGrid") && !document.getElementById("featuredProductsGrid")) {
    window.boutiqueApp.loadProducts()
  }
})
