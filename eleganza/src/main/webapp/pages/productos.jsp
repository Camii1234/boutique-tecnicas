<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Productos - Boutique Eleganza</title>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../css/main.css">
</head>
<body>
  <!-- Header -->
  <header>
    <div class="container">
      <div class="header-container">
        <!-- Logo -->
        <div class="logo" onclick="window.location.href='../index.jsp'">
          <div class="logo-icon">B</div>
          <h1 class="logo-text">Boutique <span>Eleganza</span></h1>
        </div>

        <!-- Desktop Navigation -->
        <nav>
          <a href="../index.jsp">Inicio</a>
          <a href="productos.jsp" class="active">Productos</a>
          <a href="sobre-nosotros.jsp">Sobre Nosotros</a>
          <a href="contacto.jsp">Contacto</a>
        </nav>

        <!-- Actions -->
        <div class="header-actions">
          <!-- User Info (when logged in) -->
          <div class="user-info" id="userInfo">
            <i class="fas fa-user-circle"></i>
            <span id="userName">Usuario</span>
            <div class="user-dropdown">
              <a href="#" id="adminLink" style="display: none;">Panel Admin</a>
              <a href="#" onclick="logout()">Cerrar Sesión</a>
            </div>
          </div>

          <!-- Login Button -->
          <button class="btn btn-ghost login-btn" id="loginBtn">
            <i class="fas fa-user"></i>
            <span style="margin-left: 0.5rem;">Iniciar Sesión</span>
          </button>

          <!-- Register Button -->
          <button class="btn btn-primary register-btn" id="registerBtn">
            Registrarse
          </button>

          <!-- Cart -->
          <div style="position: relative;">
            <button class="btn btn-ghost btn-icon" id="cartBtn">
              <i class="fas fa-shopping-bag"></i>
              <span class="badge" id="cartCount">0</span>
            </button>

            <!-- Cart Dropdown -->
            <div class="cart-dropdown" id="cartDropdown">
              <h3 class="cart-header">Carrito de Compras</h3>
              <div id="cartItems">
                <div class="cart-empty">Tu carrito está vacío</div>
              </div>
              <div class="cart-divider" id="cartDivider" style="display: none;"></div>
              <div class="cart-total" id="cartTotal" style="display: none;">
                <span class="cart-total-label">Total:</span>
                <span class="cart-total-price" id="cartTotalPrice">$0</span>
              </div>
              <button class="btn btn-primary cart-checkout" id="cartCheckout" style="display: none;">Finalizar Compra</button>
            </div>
          </div>

          <!-- Mobile Menu Button -->
          <button class="mobile-menu-btn" id="mobileMenuBtn">
            <i class="fas fa-bars"></i>
          </button>
        </div>
      </div>

      <!-- Mobile Menu -->
      <div class="mobile-menu" id="mobileMenu">
        <nav>
          <a href="../index.jsp">Inicio</a>
          <a href="productos.jsp" class="active">Productos</a>
          <a href="sobre-nosotros.jsp">Sobre Nosotros</a>
          <a href="contacto.jsp">Contacto</a>
        </nav>
        <div class="mobile-menu-actions">
          <button class="btn btn-outline" id="mobileLoginBtn">Iniciar Sesión</button>
          <button class="btn btn-primary" id="mobileRegisterBtn">Registrarse</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Products Section -->
  <section class="products-page">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Nuestra Colección</h2>
        <p class="section-description">
          Descubre nuestra selección cuidadosa de prendas exclusivas, perfectas para cualquier ocasión.
        </p>
      </div>

      <!-- Filters -->
      <div class="product-filters">
        <div class="filter-group">
          <label>Categoría:</label>
          <select id="categoryFilter">
            <option value="all">Todas</option>
            <option value="vestidos">Vestidos</option>
            <option value="blusas">Blusas</option>
            <option value="pantalones">Pantalones</option>
            <option value="faldas">Faldas</option>
            <option value="conjuntos">Conjuntos</option>
          </select>
        </div>
        <div class="filter-group">
          <label>Ordenar por:</label>
          <select id="sortFilter">
            <option value="default">Destacados</option>
            <option value="price-asc">Precio: Menor a Mayor</option>
            <option value="price-desc">Precio: Mayor a Menor</option>
            <option value="name-asc">Nombre: A-Z</option>
            <option value="name-desc">Nombre: Z-A</option>
          </select>
        </div>
      </div>

      <div class="products-grid" id="productsGrid">
        <!-- Los productos se cargan aquí con JavaScript -->
      </div>
    </div>
  </section>

  <!-- Footer -->
  <footer class="site-footer">
    <div class="container">
      <div class="footer-content">
        <div class="footer-logo">
          <div class="logo-icon">B</div>
          <h2 class="logo-text">Boutique <span>Eleganza</span></h2>
        </div>
        <div class="footer-links">
          <div class="footer-column">
            <h3>Navegación</h3>
            <ul>
              <li><a href="../index.jsp">Inicio</a></li>
              <li><a href="productos.jsp">Productos</a></li>
              <li><a href="sobre-nosotros.jsp">Sobre Nosotros</a></li>
              <li><a href="contacto.jsp">Contacto</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Contacto</h3>
            <ul>
              <li><i class="fas fa-envelope"></i> contacto@eleganzaboutique.com</li>
              <li><i class="fas fa-phone"></i> +57 320 555 8899</li>
              <li><i class="fas fa-map-marker-alt"></i> Calle 123 #45-67, Bogotá</li>
            </ul>
          </div>
          <div class="footer-column">
            <h3>Síguenos</h3>
            <div class="social-links">
              <a href="#" class="social-link"><i class="fab fa-facebook-f"></i></a>
              <a href="#" class="social-link"><i class="fab fa-instagram"></i></a>
              <a href="#" class="social-link"><i class="fab fa-pinterest-p"></i></a>
              <a href="#" class="social-link"><i class="fab fa-tiktok"></i></a>
            </div>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2023 Boutique Eleganza. Todos los derechos reservados.</p>
      </div>
    </div>
  </footer>

  <!-- Login Modal -->
  <div class="modal-overlay" id="loginModal">
    <div class="modal">
      <button class="modal-close" id="closeLoginModal">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal-header">
        <h2 class="modal-title">Iniciar Sesión</h2>
        <p class="modal-description">Accede a tu cuenta para una experiencia personalizada</p>
      </div>
      <div class="modal-body">
        <form id="loginForm">
          <div class="form-group">
            <label for="loginEmail" class="form-label">Correo Electrónico</label>
            <input type="email" id="loginEmail" placeholder="tu@email.com" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="loginPassword" class="form-label">Contraseña</label>
            <input type="password" id="loginPassword" placeholder="••••••••" class="form-input" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Iniciar Sesión</button>
          <div class="form-footer">
            ¿No tienes cuenta? <a href="#" id="switchToRegister">Regístrate aquí</a>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Register Modal -->
  <div class="modal-overlay" id="registerModal">
    <div class="modal">
      <button class="modal-close" id="closeRegisterModal">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal-header">
        <h2 class="modal-title">Crear Cuenta</h2>
        <p class="modal-description">Únete a nuestra comunidad exclusiva</p>
      </div>
      <div class="modal-body">
        <form id="registerForm">
          <div class="form-group">
            <label for="fullName" class="form-label">Nombre Completo</label>
            <input type="text" id="fullName" placeholder="Tu nombre completo" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="registerEmail" class="form-label">Correo Electrónico</label>
            <input type="email" id="registerEmail" placeholder="tu@email.com" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="phone" class="form-label">Número de Teléfono</label>
            <input type="tel" id="phone" placeholder="+57 320 555 8899" class="form-input" required>
          </div>
          <div class="form-group">
            <label class="form-label">Dirección de Envío</label>
            <input type="text" id="street" placeholder="Calle" class="form-input" style="margin-bottom: 0.5rem;" required>
            <div class="form-row">
              <input type="text" id="city" placeholder="Ciudad" class="form-input" required>
              <input type="text" id="zipCode" placeholder="Código Postal" class="form-input" required>
            </div>
            <input type="text" id="country" placeholder="País" class="form-input" style="margin-top: 0.5rem;" required>
          </div>
          <div class="form-group">
            <label for="registerPassword" class="form-label">Contraseña</label>
            <input type="password" id="registerPassword" placeholder="••••••••" class="form-input" required>
          </div>
          <div class="form-group">
            <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
            <input type="password" id="confirmPassword" placeholder="••••••••" class="form-input" required>
          </div>
          <button type="submit" class="btn btn-primary" style="width: 100%;">Crear Cuenta</button>
          <div class="form-footer">
            ¿Ya tienes cuenta? <a href="#" id="switchToLogin">Inicia sesión aquí</a>
          </div>
        </form>
      </div>
    </div>
  </div>

  <!-- Checkout Modal -->
  <div class="modal-overlay" id="checkoutModal">
    <div class="modal modal-large">
      <button class="modal-close" id="closeCheckoutModal">
        <i class="fas fa-times"></i>
      </button>
      <div class="modal-header">
        <h2 class="modal-title">Finalizar Compra</h2>
        <p class="modal-description">Completa tu pedido en unos simples pasos</p>
      </div>
      <div class="modal-body">
        <!-- Checkout Steps -->
        <div class="checkout-steps">
          <div class="step active" id="step1">
            <i class="fas fa-map-marker-alt"></i>
            <span>Dirección</span>
          </div>
          <div class="step" id="step2">
            <i class="fas fa-credit-card"></i>
            <span>Pago</span>
          </div>
          <div class="step" id="step3">
            <i class="fas fa-check-circle"></i>
            <span>Confirmar</span>
          </div>
        </div>

        <!-- Step 1: Address -->
        <div class="checkout-content active" id="checkoutStep1">
          <div class="checkout-grid">
            <div>
              <div class="checkout-section">
                <h3>Dirección de Facturación</h3>
                <form id="billingForm">
                  <div class="form-group">
                    <label class="form-label">Nombre Completo</label>
                    <input type="text" id="billingName" class="form-input" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Correo Electrónico</label>
                    <input type="email" id="billingEmail" class="form-input" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Teléfono</label>
                    <input type="tel" id="billingPhone" class="form-input" required>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Dirección</label>
                    <input type="text" id="billingStreet" class="form-input" required>
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Ciudad</label>
                      <input type="text" id="billingCity" class="form-input" required>
                    </div>
                    <div class="form-group">
                      <label class="form-label">Código Postal</label>
                      <input type="text" id="billingZip" class="form-input" required>
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">País</label>
                    <input type="text" id="billingCountry" class="form-input" required>
                  </div>
                </form>
              </div>
            </div>
            <div>
              <div class="order-summary">
                <h3>Resumen del Pedido</h3>
                <div id="checkoutOrderItems">
                  <!-- Order items will be loaded here -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 2: Payment -->
        <div class="checkout-content" id="checkoutStep2">
          <div class="checkout-grid">
            <div>
              <div class="checkout-section">
                <h3>Método de Pago</h3>
                <div class="payment-methods">
                  <div class="payment-method" onclick="selectPaymentMethod('card')">
                    <input type="radio" name="paymentMethod" value="card" id="paymentCard">
                    <div class="payment-method-info">
                      <div class="payment-method-name">
                        <i class="fas fa-credit-card" style="margin-right: 0.5rem;"></i>
                        Tarjeta de Crédito/Débito
                      </div>
                      <div class="payment-method-description">Visa, Mastercard, American Express</div>
                    </div>
                  </div>
                  <div class="payment-method" onclick="selectPaymentMethod('pse')">
                    <input type="radio" name="paymentMethod" value="pse" id="paymentPSE">
                    <div class="payment-method-info">
                      <div class="payment-method-name">
                        <i class="fas fa-university" style="margin-right: 0.5rem;"></i>
                        PSE
                      </div>
                      <div class="payment-method-description">Pago Seguro en Línea</div>
                    </div>
                  </div>
                  <div class="payment-method" onclick="selectPaymentMethod('nequi')">
                    <input type="radio" name="paymentMethod" value="nequi" id="paymentNequi">
                    <div class="payment-method-info">
                      <div class="payment-method-name">
                        <i class="fas fa-mobile-alt" style="margin-right: 0.5rem;"></i>
                        Nequi
                      </div>
                      <div class="payment-method-description">Pago con billetera digital</div>
                    </div>
                  </div>
                  <div class="payment-method" onclick="selectPaymentMethod('daviplata')">
                    <input type="radio" name="paymentMethod" value="daviplata" id="paymentDaviplata">
                    <div class="payment-method-info">
                      <div class="payment-method-name">
                        <i class="fas fa-mobile-alt" style="margin-right: 0.5rem;"></i>
                        Daviplata
                      </div>
                      <div class="payment-method-description">Pago con billetera digital</div>
                    </div>
                  </div>
                </div>

                <!-- Card Details Form -->
                <div id="cardDetailsForm" style="display: none; margin-top: 1.5rem;">
                  <div class="form-group">
                    <label class="form-label">Número de Tarjeta</label>
                    <input type="text" id="cardNumber" placeholder="1234 5678 9012 3456" class="form-input">
                  </div>
                  <div class="form-row">
                    <div class="form-group">
                      <label class="form-label">Fecha de Vencimiento</label>
                      <input type="text" id="cardExpiry" placeholder="MM/AA" class="form-input">
                    </div>
                    <div class="form-group">
                      <label class="form-label">CVV</label>
                      <input type="text" id="cardCVV" placeholder="123" class="form-input">
                    </div>
                  </div>
                  <div class="form-group">
                    <label class="form-label">Nombre en la Tarjeta</label>
                    <input type="text" id="cardName" class="form-input">
                  </div>
                </div>
              </div>
            </div>
            <div>
              <div class="order-summary">
                <h3>Resumen del Pedido</h3>
                <div id="checkoutOrderItems2">
                  <!-- Order items will be loaded here -->
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Step 3: Confirmation -->
        <div class="checkout-content" id="checkoutStep3">
          <div class="checkout-section">
            <h3>Confirmar Pedido</h3>
            <div id="orderConfirmation">
              <!-- Order confirmation details will be loaded here -->
            </div>
          </div>
        </div>

        <!-- Checkout Actions -->
        <div class="checkout-actions">
          <button class="btn btn-secondary" id="checkoutBack" style="display: none;" onclick="previousCheckoutStep()">Atrás</button>
          <button class="btn btn-primary" id="checkoutNext" onclick="nextCheckoutStep()">Continuar</button>
          <button class="btn btn-primary" id="checkoutFinish" style="display: none;" onclick="finishOrder()">Finalizar Pedido</button>
        </div>
      </div>
    </div>
  </div>

  <!-- Scripts -->
  <script src="../js/products.js"></script>
  <script src="../js/auth.js"></script>
  <script src="../js/cart.js"></script>
  <script src="../js/checkout.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
