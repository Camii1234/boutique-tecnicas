<%@page contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contacto - Boutique Eleganza</title>
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
          <a href="productos.jsp">Productos</a>
          <a href="sobre-nosotros.jsp">Sobre Nosotros</a>
          <a href="contacto.jsp" class="active">Contacto</a>
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
          <a href="productos.jsp">Productos</a>
          <a href="sobre-nosotros.jsp">Sobre Nosotros</a>
          <a href="contacto.jsp" class="active">Contacto</a>
        </nav>
        <div class="mobile-menu-actions">
          <button class="btn btn-outline" id="mobileLoginBtn">Iniciar Sesión</button>
          <button class="btn btn-primary" id="mobileRegisterBtn">Registrarse</button>
        </div>
      </div>
    </div>
  </header>

  <!-- Contact Section -->
  <section style="padding: 4rem 1rem; background-color: rgba(255, 255, 255, 0.5);">
    <div class="container">
      <div class="section-header">
        <h2 class="section-title">Contacto</h2>
        <p class="section-description">
          Estamos aquí para ayudarte. Contáctanos a través de cualquiera de estos medios.
        </p>
      </div>
      <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-top: 2rem;">
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: var(--shadow-lg); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-0.5rem)'" onmouseout="this.style.transform='translateY(0)'">
          <i class="fas fa-envelope" style="font-size: 2rem; color: var(--color-rose-400); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 0.5rem; color: var(--color-slate-800);">Correo</h3>
          <a href="mailto:contacto@eleganzaboutique.com" style="color: var(--color-slate-600); text-decoration: none;">contacto@eleganzaboutique.com</a>
        </div>
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: var(--shadow-lg); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-0.5rem)'" onmouseout="this.style.transform='translateY(0)'">
          <i class="fas fa-phone" style="font-size: 2rem; color: var(--color-rose-400); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 0.5rem; color: var(--color-slate-800);">Teléfono</h3>
          <a href="tel:+573205558899" style="color: var(--color-slate-600); text-decoration: none;">+57 320 555 8899</a>
        </div>
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: var(--shadow-lg); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-0.5rem)'" onmouseout="this.style.transform='translateY(0)'">
          <i class="fab fa-instagram" style="font-size: 2rem; color: var(--color-rose-400); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 0.5rem; color: var(--color-slate-800);">Instagram</h3>
          <a href="#" target="_blank" style="color: var(--color-slate-600); text-decoration: none;">@eleganzaboutique</a>
        </div>
        <div style="text-align: center; padding: 2rem; background: white; border-radius: 1rem; box-shadow: var(--shadow-lg); transition: transform 0.3s;" onmouseover="this.style.transform='translateY(-0.5rem)'" onmouseout="this.style.transform='translateY(0)'">
          <i class="fab fa-facebook" style="font-size: 2rem; color: var(--color-rose-400); margin-bottom: 1rem;"></i>
          <h3 style="margin-bottom: 0.5rem; color: var(--color-slate-800);">Facebook</h3>
          <a href="#" target="_blank" style="color: var(--color-slate-600); text-decoration: none;">facebook.com/eleganzaboutique</a>
        </div>
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

  <!-- Scripts -->
  <script src="../js/products.js"></script>
  <script src="../js/auth.js"></script>
  <script src="../js/cart.js"></script>
  <script src="../js/main.js"></script>
</body>
</html>
