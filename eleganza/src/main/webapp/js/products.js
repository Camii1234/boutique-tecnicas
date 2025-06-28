// Products Management
class ProductsManager {
  constructor() {
    this.products = []
    this.loading = false
  }

  // Get base URL for the servlet
  getBaseUrl() {
    const currentPath = window.location.pathname
    const contextPath = currentPath.substring(0, currentPath.lastIndexOf('/'))
    return contextPath + '/productos'
  }

  // Load all products from server
  async loadProducts() {
    try {
      this.loading = true
      const response = await fetch(this.getBaseUrl())
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        this.products = data.productos.map(this.mapProductFromServer)
        return this.products
      } else {
        throw new Error(data.error || 'Error al cargar productos')
      }
    } catch (error) {
      console.error('Error loading products:', error)
      // Return fallback data if server fails
      this.products = this.getFallbackProducts()
      return this.products
    } finally {
      this.loading = false
    }
  }

  // Get fallback products when server is not available
  getFallbackProducts() {
    return [
      {
        id: 1,
        name: "Vestido Elegante Rosa",
        price: 89000,
        image: "",
        description: "Vestido elegante perfecto para ocasiones especiales",
        stock: 15,
        talla: "M",
        status: "active",
        category: "vestidos",
      },
      {
        id: 2,
        name: "Blusa Seda Premium",
        price: 65000,
        image: "",
        description: "Blusa de seda de alta calidad con acabados premium",
        stock: 20,
        talla: "S",
        status: "active",
        category: "blusas",
      },
      {
        id: 3,
        name: "Pantalón Palazzo",
        price: 75000,
        image: "",
        description: "Pantalón palazzo cómodo y elegante",
        stock: 12,
        talla: "L",
        status: "active",
        category: "pantalones",
      }
    ]
  }

  // Map product data from server format to client format
  mapProductFromServer(serverProduct) {
    return {
      id: serverProduct.id,
      name: serverProduct.nombre,
      price: serverProduct.precio,
      image: serverProduct.imagen || "",
      description: serverProduct.descripcion || "",
      stock: serverProduct.stock,
      talla: serverProduct.talla,
      status: serverProduct.estado,
      category: serverProduct.categoria
    }
  }

  // Load products by category
  async loadProductsByCategory(category) {
    try {
      this.loading = true
      const url = category === 'all' ? this.getBaseUrl() : `${this.getBaseUrl()}?categoria=${encodeURIComponent(category)}`
      const response = await fetch(url)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        return data.productos.map(this.mapProductFromServer)
      } else {
        throw new Error(data.error || 'Error al cargar productos por categoría')
      }
    } catch (error) {
      console.error('Error loading products by category:', error)
      return this.filterProducts({category: category})
    } finally {
      this.loading = false
    }
  }

  // Search products
  async searchProducts(query) {
    try {
      this.loading = true
      const response = await fetch(`${this.getBaseUrl()}?accion=buscar&busqueda=${encodeURIComponent(query)}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (data.success) {
        return data.productos.map(this.mapProductFromServer)
      } else {
        throw new Error(data.error || 'Error al buscar productos')
      }
    } catch (error) {
      console.error('Error searching products:', error)
      // Fallback to local search if available
      const lowercaseQuery = query.toLowerCase()
      return this.products.filter(
        (product) =>
          product.name.toLowerCase().includes(lowercaseQuery) ||
          (product.description && product.description.toLowerCase().includes(lowercaseQuery)) ||
          product.category.toLowerCase().includes(lowercaseQuery)
      )
    } finally {
      this.loading = false
    }
  }

  // Get product by ID
  async getProductById(id) {
    try {
      const response = await fetch(`${this.getBaseUrl()}?id=${id}`)
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      const data = await response.json()
      
      if (!data.error) {
        return this.mapProductFromServer(data)
      } else {
        throw new Error(data.error)
      }
    } catch (error) {
      console.error('Error loading product by ID:', error)
      // Fallback to local search
      return this.products.find((p) => p.id === Number.parseInt(id))
    }
  }

  // Get all products (cached or load from server)
  async getAllProducts() {
    if (this.products.length === 0) {
      await this.loadProducts()
    }
    return this.products
  }

  // Get active products only
  async getActiveProducts() {
    const products = await this.getAllProducts()
    return products.filter((p) => p.status === "active" || p.status === "activo")
  }

  // Filter products locally
  filterProducts(filters) {
    let filtered = this.products

    if (filters.status && filters.status !== "all") {
      filtered = filtered.filter((p) => p.status === filters.status)
    }

    if (filters.category && filters.category !== "all") {
      filtered = filtered.filter((p) => p.category === filters.category)
    }

    return filtered
  }

  // Sort products
  sortProducts(products, sortBy) {
    const sorted = [...products]

    switch (sortBy) {
      case "price-asc":
        return sorted.sort((a, b) => a.price - b.price)
      case "price-desc":
        return sorted.sort((a, b) => b.price - a.price)
      case "name-asc":
        return sorted.sort((a, b) => a.name.localeCompare(b.name))
      case "name-desc":
        return sorted.sort((a, b) => b.name.localeCompare(a.name))
      default:
        return sorted
    }
  }

  // Get featured products (first 3 active products)
  async getFeaturedProducts() {
    const activeProducts = await this.getActiveProducts()
    return activeProducts.slice(0, 3)
  }

  // Refresh products from server
  async refreshProducts() {
    this.products = []
    return await this.loadProducts()
  }
}

// Create global instance
window.productsManager = new ProductsManager()

// Initialize products display when DOM is loaded
document.addEventListener('DOMContentLoaded', async function() {
  await initializeProductsPage()
})

// Initialize products page
async function initializeProductsPage() {
  const productsGrid = document.getElementById('productsGrid')
  const categoryFilter = document.getElementById('categoryFilter')
  const sortFilter = document.getElementById('sortFilter')
  
  if (!productsGrid) return // Not on products page
  
  try {
    // Load initial products
    await displayProducts()
    
    // Setup event listeners
    if (categoryFilter) {
      categoryFilter.addEventListener('change', async function() {
        await displayProducts()
      })
    }
    
    if (sortFilter) {
      sortFilter.addEventListener('change', async function() {
        await displayProducts()
      })
    }
    
  } catch (error) {
    console.error('Error initializing products page:', error)
    productsGrid.innerHTML = '<div class="error-message">Error al cargar los productos. Por favor, intenta más tarde.</div>'
  }
}

// Display products with current filters
async function displayProducts() {
  const productsGrid = document.getElementById('productsGrid')
  const categoryFilter = document.getElementById('categoryFilter')
  const sortFilter = document.getElementById('sortFilter')
  
  if (!productsGrid) return
  
  try {
    // Show loading state
    productsGrid.innerHTML = '<div class="loading-message">Cargando productos...</div>'
    
    let products = []
    const selectedCategory = categoryFilter ? categoryFilter.value : 'all'
    
    // Load products based on category
    if (selectedCategory === 'all') {
      products = await window.productsManager.getActiveProducts()
    } else {
      products = await window.productsManager.loadProductsByCategory(selectedCategory)
    }
    
    // Apply sorting
    const sortBy = sortFilter ? sortFilter.value : 'default'
    products = window.productsManager.sortProducts(products, sortBy)
    
    // Display products
    if (products.length === 0) {
      productsGrid.innerHTML = '<div class="no-products">No se encontraron productos.</div>'
      return
    }
    
    productsGrid.innerHTML = products.map(product => createProductCard(product)).join('')
    
  } catch (error) {
    console.error('Error displaying products:', error)
    productsGrid.innerHTML = '<div class="error-message">Error al mostrar los productos.</div>'
  }
}

// Create product card HTML
function createProductCard(product) {
  const imageUrl = product.image || 'https://via.placeholder.com/300x400?text=Sin+Imagen'
  const priceFormatted = new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0
  }).format(product.price)

  return `
    <div class="product-card" data-product-id="${product.id}">
      <div class="product-image">
        <img src="${imageUrl}" alt="${product.name}" loading="lazy">
        <div class="product-actions">
          <button class="btn-action" onclick="addToCart(${product.id})" title="Agregar al carrito">
            <i class="fas fa-shopping-bag"></i>
          </button>
          <button class="btn-action" onclick="viewProduct(${product.id})" title="Ver detalles">
            <i class="fas fa-eye"></i>
          </button>
        </div>
        ${product.stock <= 5 ? '<div class="product-badge low-stock">Pocas unidades</div>' : ''}
        ${product.stock === 0 ? '<div class="product-badge out-of-stock">Agotado</div>' : ''}
      </div>
      <div class="product-info">
        <h3 class="product-name">${product.name}</h3>
        <p class="product-price">${priceFormatted}</p>
        <p class="product-size">Talla: ${product.talla}</p>
        <p class="product-stock">Stock: ${product.stock} unidades</p>
      </div>
    </div>
  `
}

// View product details
function viewProduct(productId) {
  // This could open a modal with product details
  console.log('Viewing product:', productId)
  // TODO: Implement product detail modal
}

// Add product to cart
function addToCart(productId) {
  if (typeof window.cartManager !== 'undefined') {
    window.cartManager.addToCart(productId)
  } else {
    console.log('Adding to cart:', productId)
    // Fallback behavior
    alert('Producto agregado al carrito')
  }
}
