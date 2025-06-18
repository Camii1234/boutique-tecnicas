// Checkout Management
class CheckoutManager {
  constructor() {
    this.currentStep = 1
    this.selectedPaymentMethod = null
    this.billingData = {}
    this.paymentData = {}
  }

  // Start checkout process
  startCheckout() {
    if (window.cartManager.getCartItems().length === 0) {
      window.showNotification("Tu carrito está vacío.", "error")
      return
    }

    if (!window.authManager.isLoggedIn()) {
      window.showNotification("Debes iniciar sesión para continuar con la compra.", "error")
      window.openModal(document.getElementById("loginModal"))
      return
    }

    // Pre-fill billing form with user data
    const currentUser = window.authManager.getCurrentUser()
    if (currentUser) {
      this.prefillBillingForm(currentUser)
    }

    this.loadCheckoutOrderSummary()
    window.openModal(document.getElementById("checkoutModal"))

    // Close cart dropdown
    const cartDropdown = document.getElementById("cartDropdown")
    if (cartDropdown) {
      cartDropdown.classList.remove("active")
    }
  }

  // Pre-fill billing form with user data
  prefillBillingForm(user) {
    const fields = {
      billingName: user.name || "",
      billingEmail: user.email || "",
      billingPhone: user.phone || "",
      billingStreet: user.street || "",
      billingCity: user.city || "",
      billingZip: user.zipCode || "",
      billingCountry: user.country || "",
    }

    Object.entries(fields).forEach(([fieldId, value]) => {
      const field = document.getElementById(fieldId)
      if (field) field.value = value
    })
  }

  // Load order summary for checkout
  loadCheckoutOrderSummary() {
    const containers = ["checkoutOrderItems", "checkoutOrderItems2"]

    containers.forEach((containerId) => {
      const container = document.getElementById(containerId)
      if (!container) return

      container.innerHTML = ""
      const cartItems = window.cartManager.getCartItems()
      const total = window.cartManager.getCartTotal()

      cartItems.forEach((item) => {
        const itemTotal = item.price * item.quantity

        const orderItem = document.createElement("div")
        orderItem.className = "order-item"
        orderItem.innerHTML = `
          <div class="order-item-details">
            <div class="order-item-name">${item.name}</div>
            <div class="order-item-info">Talla: ${item.size} | Cantidad: ${item.quantity}</div>
          </div>
          <div class="order-item-price">$${itemTotal.toLocaleString()}</div>
        `
        container.appendChild(orderItem)
      })

      // Add shipping
      const shippingItem = document.createElement("div")
      shippingItem.className = "order-item"
      shippingItem.innerHTML = `
        <div class="order-item-details">
          <div class="order-item-name">Envío</div>
        </div>
        <div class="order-item-price">$15.000</div>
      `
      container.appendChild(shippingItem)

      // Add total
      const totalItem = document.createElement("div")
      totalItem.className = "order-item"
      totalItem.innerHTML = `
        <div class="order-item-details">
          <div class="order-item-name">Total</div>
        </div>
        <div class="order-item-price">$${(total + 15000).toLocaleString()}</div>
      `
      container.appendChild(totalItem)
    })
  }

  // Move to next checkout step
  nextCheckoutStep() {
    if (this.currentStep === 1) {
      // Validate billing form
      if (!this.validateBillingForm()) {
        return
      }

      this.currentStep = 2
      this.showCheckoutStep(2)
    } else if (this.currentStep === 2) {
      // Validate payment method
      if (!this.validatePaymentMethod()) {
        return
      }

      this.currentStep = 3
      this.showCheckoutStep(3)
      this.loadOrderConfirmation()
    }
  }

  // Move to previous checkout step
  previousCheckoutStep() {
    if (this.currentStep > 1) {
      this.currentStep--
      this.showCheckoutStep(this.currentStep)
    }
  }

  // Show specific checkout step
  showCheckoutStep(step) {
    // Update step indicators
    for (let i = 1; i <= 3; i++) {
      const stepElement = document.getElementById(`step${i}`)
      const contentElement = document.getElementById(`checkoutStep${i}`)

      if (stepElement && contentElement) {
        stepElement.classList.remove("active", "completed")
        contentElement.classList.remove("active")

        if (i < step) {
          stepElement.classList.add("completed")
        } else if (i === step) {
          stepElement.classList.add("active")
          contentElement.classList.add("active")
        }
      }
    }

    // Update buttons
    const backBtn = document.getElementById("checkoutBack")
    const nextBtn = document.getElementById("checkoutNext")
    const finishBtn = document.getElementById("checkoutFinish")

    if (backBtn && nextBtn && finishBtn) {
      if (step === 1) {
        backBtn.style.display = "none"
        nextBtn.style.display = "block"
        finishBtn.style.display = "none"
      } else if (step === 2) {
        backBtn.style.display = "block"
        nextBtn.style.display = "block"
        finishBtn.style.display = "none"
        this.loadCheckoutOrderSummary()
      } else if (step === 3) {
        backBtn.style.display = "block"
        nextBtn.style.display = "none"
        finishBtn.style.display = "block"
      }
    }
  }

  // Validate billing form
  validateBillingForm() {
    const billingForm = document.getElementById("billingForm")
    if (!billingForm || !billingForm.checkValidity()) {
      if (billingForm) billingForm.reportValidity()
      return false
    }

    // Store billing data
    this.billingData = {
      name: document.getElementById("billingName").value,
      email: document.getElementById("billingEmail").value,
      phone: document.getElementById("billingPhone").value,
      street: document.getElementById("billingStreet").value,
      city: document.getElementById("billingCity").value,
      zip: document.getElementById("billingZip").value,
      country: document.getElementById("billingCountry").value,
    }

    return true
  }

  // Validate payment method
  validatePaymentMethod() {
    if (!this.selectedPaymentMethod) {
      window.showNotification("Por favor selecciona un método de pago.", "error")
      return false
    }

    if (this.selectedPaymentMethod === "card") {
      const cardNumber = document.getElementById("cardNumber")?.value
      const cardExpiry = document.getElementById("cardExpiry")?.value
      const cardCVV = document.getElementById("cardCVV")?.value
      const cardName = document.getElementById("cardName")?.value

      if (!cardNumber || !cardExpiry || !cardCVV || !cardName) {
        window.showNotification("Por favor completa todos los datos de la tarjeta.", "error")
        return false
      }

      // Store payment data (in real app, this should be handled securely)
      this.paymentData = {
        cardNumber: cardNumber.slice(-4), // Only store last 4 digits
        cardName: cardName,
        cardExpiry: cardExpiry,
      }
    }

    return true
  }

  // Select payment method
  selectPaymentMethod(method) {
    this.selectedPaymentMethod = method

    // Update visual selection
    const paymentMethods = document.querySelectorAll(".payment-method")
    paymentMethods.forEach((pm) => pm.classList.remove("selected"))

    const selectedMethod = document.querySelector(`#payment${method.charAt(0).toUpperCase() + method.slice(1)}`)
    if (selectedMethod) {
      selectedMethod.closest(".payment-method").classList.add("selected")
    }

    // Show/hide card details form
    const cardDetailsForm = document.getElementById("cardDetailsForm")
    if (cardDetailsForm) {
      cardDetailsForm.style.display = method === "card" ? "block" : "none"
    }
  }

  // Load order confirmation
  loadOrderConfirmation() {
    const confirmationContainer = document.getElementById("orderConfirmation")
    if (!confirmationContainer) return

    const cartItems = window.cartManager.getCartItems()
    const total = window.cartManager.getCartTotal()

    confirmationContainer.innerHTML = `
      <div style="background: var(--color-slate-50); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 1rem; color: var(--color-slate-800);">Dirección de Envío</h4>
        <p><strong>${this.billingData.name}</strong></p>
        <p>${this.billingData.street}</p>
        <p>${this.billingData.city}, ${this.billingData.zip}</p>
        <p>${this.billingData.country}</p>
        <p>Tel: ${this.billingData.phone}</p>
      </div>
      
      <div style="background: var(--color-slate-50); padding: 1.5rem; border-radius: 0.5rem; margin-bottom: 1.5rem;">
        <h4 style="margin-bottom: 1rem; color: var(--color-slate-800);">Método de Pago</h4>
        <p><strong>${this.getPaymentMethodName(this.selectedPaymentMethod)}</strong></p>
        ${this.selectedPaymentMethod === "card" ? `<p>**** **** **** ${this.paymentData.cardNumber}</p>` : ""}
      </div>
      
      <div style="background: var(--color-slate-50); padding: 1.5rem; border-radius: 0.5rem;">
        <h4 style="margin-bottom: 1rem; color: var(--color-slate-800);">Resumen del Pedido</h4>
        ${cartItems
          .map(
            (item) => `
          <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
            <span>${item.name} (${item.size}) x${item.quantity}</span>
            <span>$${(item.price * item.quantity).toLocaleString()}</span>
          </div>
        `,
          )
          .join("")}
        <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
          <span>Envío</span>
          <span>$15.000</span>
        </div>
        <hr style="margin: 1rem 0; border: none; border-top: 1px solid var(--color-slate-300);">
        <div style="display: flex; justify-content: space-between; font-weight: bold; font-size: 1.125rem; color: var(--color-rose-600);">
          <span>Total</span>
          <span>$${(total + 15000).toLocaleString()}</span>
        </div>
      </div>
    `
  }

  // Get payment method display name
  getPaymentMethodName(method) {
    const methods = {
      card: "Tarjeta de Crédito/Débito",
      pse: "PSE - Pago Seguro en Línea",
      nequi: "Nequi",
      daviplata: "Daviplata",
    }
    return methods[method] || method
  }

  // Finish order
  finishOrder() {
    // Simulate order processing
    window.showNotification("Procesando tu pedido...", "info")

    setTimeout(() => {
      // Create order record (in real app, this would be sent to server)
      const order = {
        id: "BE" + Math.random().toString(36).substr(2, 9).toUpperCase(),
        items: window.cartManager.getCartItems(),
        billing: this.billingData,
        payment: {
          method: this.selectedPaymentMethod,
          ...this.paymentData,
        },
        total: window.cartManager.getCartTotal() + 15000,
        date: new Date().toISOString(),
        status: "confirmed",
      }

      // Save order to localStorage (in real app, this would be sent to server)
      const orders = JSON.parse(localStorage.getItem("boutique_orders") || "[]")
      orders.push(order)
      localStorage.setItem("boutique_orders", JSON.stringify(orders))

      window.showNotification("¡Pedido realizado con éxito! Recibirás un correo de confirmación.", "success")

      // Clear cart and close modal
      window.cartManager.clearCart()
      window.closeModal(document.getElementById("checkoutModal"))

      // Reset checkout
      this.currentStep = 1
      this.selectedPaymentMethod = null
      this.billingData = {}
      this.paymentData = {}
      this.showCheckoutStep(1)

      // Show success message
      setTimeout(() => {
        alert(
          `¡Gracias por tu compra!\n\nTu pedido ha sido procesado exitosamente.\nRecibirás un correo de confirmación con los detalles del envío.\n\nNúmero de pedido: #${order.id}`,
        )
      }, 1000)
    }, 2000)
  }

  // Reset checkout
  reset() {
    this.currentStep = 1
    this.selectedPaymentMethod = null
    this.billingData = {}
    this.paymentData = {}
    this.showCheckoutStep(1)
  }
}

// Create global instance
window.checkoutManager = new CheckoutManager()

// Global functions for checkout
window.nextCheckoutStep = () => window.checkoutManager.nextCheckoutStep()
window.previousCheckoutStep = () => window.checkoutManager.previousCheckoutStep()
window.selectPaymentMethod = (method) => window.checkoutManager.selectPaymentMethod(method)
window.finishOrder = () => window.checkoutManager.finishOrder()
