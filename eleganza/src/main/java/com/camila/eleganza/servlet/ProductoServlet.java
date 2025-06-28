package com.camila.eleganza.servlet;

import com.camila.eleganza.dao.ProductoDAO;
import com.camila.eleganza.model.Producto;
import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;

import jakarta.servlet.ServletException;
import jakarta.servlet.annotation.WebServlet;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.Base64;
import java.util.List;

@WebServlet("/productos")
public class ProductoServlet extends HttpServlet {
    
    private ProductoDAO productoDAO;
    private Gson gson;
    
    @Override
    public void init() throws ServletException {
        productoDAO = new ProductoDAO();
        gson = new Gson();
    }
    
    @Override
    protected void doGet(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        
        response.setContentType("application/json");
        response.setCharacterEncoding("UTF-8");
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        
        String accion = request.getParameter("accion");
        String categoria = request.getParameter("categoria");
        String busqueda = request.getParameter("busqueda");
        String idParam = request.getParameter("id");
        
        PrintWriter out = response.getWriter();
        
        try {
            List<Producto> productos = null;
            
            if ("buscar".equals(accion) && busqueda != null && !busqueda.trim().isEmpty()) {
                productos = productoDAO.buscarProductos(busqueda.trim());
            } else if (categoria != null && !categoria.equals("all")) {
                productos = productoDAO.obtenerProductosPorCategoria(categoria);
            } else if (idParam != null) {
                // Obtener un producto específico por ID
                try {
                    int id = Integer.parseInt(idParam);
                    Producto producto = productoDAO.obtenerProductoPorId(id);
                    if (producto != null) {
                        JsonObject productoJson = convertirProductoAJson(producto);
                        out.print(gson.toJson(productoJson));
                    } else {
                        response.setStatus(HttpServletResponse.SC_NOT_FOUND);
                        out.print("{\"error\":\"Producto no encontrado\"}");
                    }
                    return;
                } catch (NumberFormatException e) {
                    response.setStatus(HttpServletResponse.SC_BAD_REQUEST);
                    out.print("{\"error\":\"ID de producto inválido\"}");
                    return;
                }
            } else {
                productos = productoDAO.obtenerTodosLosProductos();
            }
            
            JsonArray productosJson = new JsonArray();
            
            if (productos != null) {
                for (Producto producto : productos) {
                    JsonObject productoJson = convertirProductoAJson(producto);
                    productosJson.add(productoJson);
                }
            }
            
            JsonObject respuesta = new JsonObject();
            respuesta.addProperty("success", true);
            respuesta.add("productos", productosJson);
            respuesta.addProperty("total", productos != null ? productos.size() : 0);
            
            out.print(gson.toJson(respuesta));
            
        } catch (Exception e) {
            response.setStatus(HttpServletResponse.SC_INTERNAL_SERVER_ERROR);
            JsonObject error = new JsonObject();
            error.addProperty("success", false);
            error.addProperty("error", "Error interno del servidor: " + e.getMessage());
            out.print(gson.toJson(error));
            e.printStackTrace();
        } finally {
            out.flush();
        }
    }
    
    private JsonObject convertirProductoAJson(Producto producto) {
        JsonObject productoJson = new JsonObject();
        productoJson.addProperty("id", producto.getIdProducto());
        productoJson.addProperty("nombre", producto.getNombre());
        productoJson.addProperty("precio", producto.getPrecio());
        productoJson.addProperty("talla", producto.getTalla());
        productoJson.addProperty("categoria", producto.getCategoria());
        productoJson.addProperty("stock", producto.getStock());
        productoJson.addProperty("estado", producto.getEstado());
        
        // Convertir imagen a Base64 si existe
        if (producto.getImagen() != null) {
            String imagenBase64 = Base64.getEncoder().encodeToString(producto.getImagen());
            productoJson.addProperty("imagen", "data:image/jpeg;base64," + imagenBase64);
        } else {
            productoJson.addProperty("imagen", "");
        }
        
        return productoJson;
    }
    
    @Override
    protected void doOptions(HttpServletRequest request, HttpServletResponse response) 
            throws ServletException, IOException {
        response.setHeader("Access-Control-Allow-Origin", "*");
        response.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        response.setHeader("Access-Control-Allow-Headers", "Content-Type");
        response.setStatus(HttpServletResponse.SC_OK);
    }
}
