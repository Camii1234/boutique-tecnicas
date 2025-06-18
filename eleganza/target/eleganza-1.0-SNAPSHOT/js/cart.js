// Cart Management
class CartManager {
  constructor() {
    this.cart = this.loadCart()
    this.selectedSizes = {}
  }

  // Load cart from localStorage
  loadCart() {
    const stored = localStorage.getItem("boutique_cart")
    return stored ? JSON.parse(stored) : []
  }

  // Save cart to localStorage
  saveCart() {
    localStorage.setItem("boutique_cart", JSON.stringify(this.cart))
  }

  // Add item to cart
  addToCart(productId, size) {
    if (!size) {
      throw new Error("Por favor selecciona una talla antes de agregar al carrito.")
    }

    const product = window.productsManager.getProductById(productId)
    if (!product) {
      throw new Error("Producto no encontrado.")
    }

    const existingItem = this.cart.find((item) => item.id === productId && item.size === size)

    if (existingItem) {
      existingItem.quantity += 1
    } else {
      this.cart.push({
        id: productId,
        name: product.name,
        price: product.price,
        size: size,
        quantity: 1,
        icon: product.icon,
      })
    }

    this.saveCart()
    this.updateCartDisplay()
  }

  // Remove item from cart
  removeFromCart(index) {
    if (index >= 0 && index < this.cart.length) {
      this.cart.splice(index, 1)
      this.saveCart()
      this.updateCartDisplay()
    }
  }

  // Update item quantity
  updateQuantity(index, quantity) {
    if (index >= 0 && index < this.cart.length) {
      if (quantity <= 0) {
        this.removeFromCart(index)
      } else {
        this.cart[index].quantity = quantity
        this.saveCart()
        this.updateCartDisplay()
      }
    }
  }

  // Get cart items
  getCartItems() {
    return this.cart
  }

  // Get cart total
  getCartTotal() {
    return this.cart.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Get cart item count
  getCartItemCount() {
    return this.cart.reduce((count, item) => count + item.quantity, 0)
  }

  // Clear cart
  clearCart() {
    this.cart = []
    this.saveCart()
    this.updateCartDisplay()
  }

  // Update cart display in UI
  updateCartDisplay() {
    const cartCount = document.getElementById("cartCount")
    const cartItems = document.getElementById("cartItems")
    const cartDivider = document.getElementById("cartDivider")
    const cartTotal = document.getElementById("cartTotal")
    const cartTotalPrice = document.getElementById("cartTotalPrice")
    const cartCheckout = document.getElementById("cartCheckout")

    if (!cartCount) return // Exit if elements don't exist

    const totalItems = this.getCartItemCount()
    cartCount.textContent = totalItems

    if (this.cart.length === 0) {
      cartItems.innerHTML = '<div class="cart-empty">Tu carrito está vacío</div>'
      if (cartDivider) cartDivider.style.display = "none"
      if (cartTotal) cartTotal.style.display = "none"
      if (cartCheckout) cartCheckout.style.display = "none"
    } else {
      cartItems.innerHTML = ""
      const total = this.getCartTotal()

      this.cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity

        const cartItem = document.createElement("div")
        cartItem.className = "cart-item"
        cartItem.innerHTML = `
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-info">Talla: ${item.size} | Cantidad: ${item.quantity}</div>
            <div class="cart-item-price">$${itemTotal.toLocaleString()}</div>
          </div>
          <button class="cart-item-remove" onclick="window.cartManager.removeFromCart(${index})">
            <i class="fas fa-trash"></i>
          </button>
        `
        cartItems.appendChild(cartItem)
      })

      if (cartTotalPrice) cartTotalPrice.textContent = `$${total.toLocaleString()}`
      if (cartDivider) cartDivider.style.display = "block"
      if (cartTotal) cartTotal.style.display = "flex"
      if (cartCheckout) cartCheckout.style.display = "block"
    }
  }

  // Select size for product
  selectSize(productId, size) {
    this.selectedSizes[productId] = size

    // Update visual selection
    const productCards = document.querySelectorAll(".product-card")
    productCards.forEach((card) => {
      const addButton = card.querySelector(`[onclick*="addToCart(${productId})"]`)
      if (addButton) {
        const sizeOptions = card.querySelectorAll(".size-option")
        sizeOptions.forEach((option) => {
          option.classList.remove("selected")
          if (option.textContent === size) {
            option.classList.add("selected")
          }
        })
      }
    })
  }

  // Get selected size for product
  getSelectedSize(productId) {
    return this.selectedSizes[productId]
  }
}

// Create global instance
window.cartManager = new CartManager()
