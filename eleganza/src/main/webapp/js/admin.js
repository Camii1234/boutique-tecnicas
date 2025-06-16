// Admin Panel Management
class AdminManager {
  constructor() {
    this.currentTab = "products"
    this.currentPage = 1
    this.itemsPerPage = 10
    this.searchQuery = ""
    this.filterStatus = "all"
    this.editingProductId = null

    this.init()
  }

  init() {
    // Check if user is admin
    if (!window.authManager.isAdmin()) {
      window.location.href = "../index.html"
      return
    }

    this.setupEventListeners()
    this.loadProductsTable()
  }

  setupEventListeners() {
    // Tab switching
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        this.switchTab(e.target.dataset.tab)
      })
    })

    // Add product button
    const addProductBtn = document.getElementById("addProductBtn")
    if (addProductBtn) {
      addProductBtn.addEventListener("click", () => this.openProductModal())
    }

    // Product form
    const productForm = document.getElementById("productForm")
    if (productForm) {
      productForm.addEventListener("submit", (e) => this.handleProductSubmit(e))
    }

    // Search and filter
    const productSearch = document.getElementById("productSearch")
    if (productSearch) {
      productSearch.addEventListener("input", (e) => {
        this.searchQuery = e.target.value
        this.loadProductsTable()
      })
    }

    const productFilter = document.getElementById("productFilter")
    if (productFilter) {
      productFilter.addEventListener("change", (e) => {
        this.filterStatus = e.target.value
        this.loadProductsTable()
      })
    }

    // Modal close buttons
    const closeProductModal = document.getElementById("closeProductModal")
    if (closeProductModal) {
      closeProductModal.addEventListener("click", () => this.closeProductModal())
    }

    const cancelProductBtn = document.getElementById("cancelProductBtn")
    if (cancelProductBtn) {
      cancelProductBtn.addEventListener("click", () => this.closeProductModal())
    }

    // Delete modal
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn")
    if (cancelDeleteBtn) {
      cancelDeleteBtn.addEventListener("click", () => this.closeDeleteModal())
    }

    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn")
    if (confirmDeleteBtn) {
      confirmDeleteBtn.addEventListener("click", () => this.confirmDelete())
    }

    // Pagination
    const prevPage = document.getElementById("prevPage")
    const nextPage = document.getElementById("nextPage")
    if (prevPage) prevPage.addEventListener("click", () => this.changePage(-1))
    if (nextPage) nextPage.addEventListener("click", () => this.changePage(1))
  }

  switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll(".tab-btn").forEach((btn) => {
      btn.classList.remove("active")
    })
    document.querySelector(`[data-tab="${tabName}"]`).classList.add("active")

    // Update tab content
    document.querySelectorAll(".tab-content").forEach((content) => {
      content.classList.remove("active")
    })
    document.getElementById(`${tabName}-tab`).classList.add("active")

    this.currentTab = tabName

    // Load content based on tab
    if (tabName === "products") {
      this.loadProductsTable()
    }
  }

  loadProductsTable() {
    const tbody = document.getElementById("productsTableBody")
    if (!tbody) return

    let products = window.productsManager.getAllProducts()

    // Apply search filter
    if (this.searchQuery) {
      products = window.productsManager.searchProducts(this.searchQuery)
    }

    // Apply status filter
    if (this.filterStatus !== "all") {
      products = products.filter((p) => p.status === this.filterStatus)
    }

    // Calculate pagination
    const totalPages = Math.ceil(products.length / this.itemsPerPage)
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    const paginatedProducts = products.slice(startIndex, endIndex)

    // Clear table
    tbody.innerHTML = ""

    if (paginatedProducts.length === 0) {
      tbody.innerHTML = `
        <tr>
          <td colspan="7" class="empty-state">
            <i class="fas fa-box-open"></i>
            <h3>No se encontraron productos</h3>
            <p>No hay productos que coincidan con los criterios de búsqueda.</p>
          </td>
        </tr>
      `
      return
    }

    // Populate table
    paginatedProducts.forEach((product) => {
      const row = document.createElement("tr")
      row.innerHTML = `
        <td>${product.id}</td>
        <td>
          <div class="product-image-cell">${product.icon}</div>
        </td>
        <td>${product.name}</td>
        <td>$${product.price.toLocaleString()}</td>
        <td>${product.stock}</td>
        <td>
          <span class="status-badge status-${product.status}">
            ${product.status === "active" ? "Activo" : "Inactivo"}
          </span>
        </td>
        <td>
          <div class="action-buttons">
            <button class="action-btn action-btn-edit" onclick="window.adminManager.editProduct(${product.id})">
              <i class="fas fa-edit"></i> Editar
            </button>
            <button class="action-btn action-btn-delete" onclick="window.adminManager.deleteProduct(${product.id})">
              <i class="fas fa-trash"></i> Eliminar
            </button>
          </div>
        </td>
      `
      tbody.appendChild(row)
    })

    // Update pagination
    this.updatePagination(totalPages)
  }

  updatePagination(totalPages) {
    const currentPageSpan = document.getElementById("currentPage")
    const prevPageBtn = document.getElementById("prevPage")
    const nextPageBtn = document.getElementById("nextPage")

    if (currentPageSpan) {
      currentPageSpan.textContent = `Página ${this.currentPage} de ${totalPages}`
    }

    if (prevPageBtn) {
      prevPageBtn.disabled = this.currentPage <= 1
    }

    if (nextPageBtn) {
      nextPageBtn.disabled = this.currentPage >= totalPages
    }
  }

  changePage(direction) {
    const newPage = this.currentPage + direction
    if (newPage >= 1) {
      this.currentPage = newPage
      this.loadProductsTable()
    }
  }

  openProductModal(productId = null) {
    const modal = document.getElementById("productModal")
    const modalTitle = document.getElementById("productModalTitle")
    const form = document.getElementById("productForm")

    this.editingProductId = productId

    if (productId) {
      // Edit mode
      const product = window.productsManager.getProductById(productId)
      if (product) {
        modalTitle.textContent = "Editar Producto"
        this.populateProductForm(product)
      }
    } else {
      // Add mode
      modalTitle.textContent = "Añadir Producto"
      form.reset()
    }

    window.openModal(modal)
  }

  populateProductForm(product) {
    document.getElementById("productId").value = product.id
    document.getElementById("productName").value = product.name
    document.getElementById("productPrice").value = product.price
    document.getElementById("productStock").value = product.stock
    document.getElementById("productDescription").value = product.description
    document.getElementById("productIcon").value = product.icon

    // Set sizes
    document.querySelectorAll('input[name="sizes"]').forEach((checkbox) => {
      checkbox.checked = product.sizes.includes(checkbox.value)
    })

    // Set status
    document.querySelectorAll('input[name="status"]').forEach((radio) => {
      radio.checked = radio.value === product.status
    })
  }

  closeProductModal() {
    window.closeModal(document.getElementById("productModal"))
    this.editingProductId = null
  }

  handleProductSubmit(e) {
    e.preventDefault()

    const formData = new FormData(e.target)
    const productData = {
      name: formData.get("productName") || document.getElementById("productName").value,
      price: Number.parseInt(document.getElementById("productPrice").value),
      stock: Number.parseInt(document.getElementById("productStock").value),
      description: document.getElementById("productDescription").value,
      icon: document.getElementById("productIcon").value,
      sizes: Array.from(document.querySelectorAll('input[name="sizes"]:checked')).map((cb) => cb.value),
      status: document.querySelector('input[name="status"]:checked').value,
      category: this.getCategoryFromName(document.getElementById("productName").value),
    }

    try {
      if (this.editingProductId) {
        // Update existing product
        window.productsManager.updateProduct(this.editingProductId, productData)
        window.showNotification("Producto actualizado exitosamente", "success")
      } else {
        // Add new product
        window.productsManager.addProduct(productData)
        window.showNotification("Producto añadido exitosamente", "success")
      }

      this.closeProductModal()
      this.loadProductsTable()
    } catch (error) {
      window.showNotification("Error al guardar el producto: " + error.message, "error")
    }
  }

  getCategoryFromName(name) {
    const nameLower = name.toLowerCase()
    if (nameLower.includes("vestido")) return "vestidos"
    if (nameLower.includes("blusa")) return "blusas"
    if (nameLower.includes("pantalón") || nameLower.includes("pantalon")) return "pantalones"
    if (nameLower.includes("falda")) return "faldas"
    if (nameLower.includes("conjunto")) return "conjuntos"
    if (nameLower.includes("chaqueta") || nameLower.includes("blazer")) return "chaquetas"
    return "otros"
  }

  editProduct(productId) {
    this.openProductModal(productId)
  }

  deleteProduct(productId) {
    this.productToDelete = productId
    window.openModal(document.getElementById("deleteModal"))
  }

  closeDeleteModal() {
    window.closeModal(document.getElementById("deleteModal"))
    this.productToDelete = null
  }

  confirmDelete() {
    if (this.productToDelete) {
      try {
        window.productsManager.deleteProduct(this.productToDelete)
        window.showNotification("Producto eliminado exitosamente", "success")
        this.loadProductsTable()
      } catch (error) {
        window.showNotification("Error al eliminar el producto: " + error.message, "error")
      }
    }
    this.closeDeleteModal()
  }
}

// Initialize admin manager when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  window.adminManager = new AdminManager()
})
