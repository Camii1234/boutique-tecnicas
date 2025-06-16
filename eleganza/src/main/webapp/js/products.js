// Products Management
class ProductsManager {
  constructor() {
    this.products = this.loadProducts()
    this.nextId = this.getNextId()
  }

  // Load products from localStorage or use default data
  loadProducts() {
    const stored = localStorage.getItem("boutique_products")
    if (stored) {
      return JSON.parse(stored)
    }

    // Default products
    const defaultProducts = [
      {
        id: 1,
        name: "Vestido Elegante Rosa",
        price: 89000,
        icon: "👗",
        description: "Vestido elegante perfecto para ocasiones especiales",
        stock: 15,
        sizes: ["S", "M", "L"],
        status: "active",
        category: "vestidos",
      },
      {
        id: 2,
        name: "Blusa Seda Premium",
        price: 65000,
        icon: "👚",
        description: "Blusa de seda de alta calidad con acabados premium",
        stock: 20,
        sizes: ["XS", "S", "M", "L"],
        status: "active",
        category: "blusas",
      },
      {
        id: 3,
        name: "Pantalón Palazzo",
        price: 75000,
        icon: "👖",
        description: "Pantalón palazzo cómodo y elegante",
        stock: 12,
        sizes: ["S", "M", "L", "XL"],
        status: "active",
        category: "pantalones",
      },
      {
        id: 4,
        name: "Chaqueta Blazer",
        price: 120000,
        icon: "🧥",
        description: "Blazer estructurado para look profesional",
        stock: 8,
        sizes: ["S", "M", "L"],
        status: "active",
        category: "chaquetas",
      },
      {
        id: 5,
        name: "Falda Midi Plisada",
        price: 55000,
        icon: "👗",
        description: "Falda midi con plisado elegante",
        stock: 18,
        sizes: ["XS", "S", "M", "L"],
        status: "active",
        category: "faldas",
      },
      {
        id: 6,
        name: "Conjunto Dos Piezas",
        price: 95000,
        icon: "👔",
        description: "Conjunto coordinado de dos piezas",
        stock: 10,
        sizes: ["S", "M", "L"],
        status: "active",
        category: "conjuntos",
      },
    ]

    this.saveProducts(defaultProducts)
    return defaultProducts
  }

  // Save products to localStorage
  saveProducts(products = this.products) {
    localStorage.setItem("boutique_products", JSON.stringify(products))
  }

  // Get next available ID
  getNextId() {
    return Math.max(...this.products.map((p) => p.id), 0) + 1
  }

  // Get all products
  getAllProducts() {
    return this.products
  }

  // Get active products only
  getActiveProducts() {
    return this.products.filter((p) => p.status === "active")
  }

  // Get product by ID
  getProductById(id) {
    return this.products.find((p) => p.id === Number.parseInt(id))
  }

  // Add new product
  addProduct(productData) {
    const newProduct = {
      id: this.nextId++,
      ...productData,
      status: productData.status || "active",
    }

    this.products.push(newProduct)
    this.saveProducts()
    return newProduct
  }

  // Update product
  updateProduct(id, productData) {
    const index = this.products.findIndex((p) => p.id === Number.parseInt(id))
    if (index !== -1) {
      this.products[index] = { ...this.products[index], ...productData }
      this.saveProducts()
      return this.products[index]
    }
    return null
  }

  // Delete product
  deleteProduct(id) {
    const index = this.products.findIndex((p) => p.id === Number.parseInt(id))
    if (index !== -1) {
      const deleted = this.products.splice(index, 1)[0]
      this.saveProducts()
      return deleted
    }
    return null
  }

  // Search products
  searchProducts(query) {
    const lowercaseQuery = query.toLowerCase()
    return this.products.filter(
      (product) =>
        product.name.toLowerCase().includes(lowercaseQuery) ||
        product.description.toLowerCase().includes(lowercaseQuery) ||
        product.category.toLowerCase().includes(lowercaseQuery),
    )
  }

  // Filter products
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
  getFeaturedProducts() {
    return this.getActiveProducts().slice(0, 3)
  }
}

// Create global instance
window.productsManager = new ProductsManager()
