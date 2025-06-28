package com.camila.eleganza.dao;

import com.camila.eleganza.model.Producto;
import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class ProductoDAO {
    
    public List<Producto> obtenerTodosLosProductos() {
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT * FROM productos WHERE estado = 'activo'";
        
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Producto producto = new Producto();
                producto.setIdProducto(rs.getInt("id_producto"));
                producto.setNombre(rs.getString("nombre"));
                producto.setPrecio(rs.getDouble("precio"));
                producto.setTalla(rs.getString("talla"));
                producto.setCategoria(rs.getString("categoria"));
                producto.setStock(rs.getInt("stock"));
                producto.setEstado(rs.getString("estado"));
                producto.setImagen(rs.getBytes("imagen"));
                
                productos.add(producto);
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener productos: " + e.getMessage());
            e.printStackTrace();
        }
        
        return productos;
    }
    
    public List<Producto> obtenerProductosPorCategoria(String categoria) {
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT * FROM productos WHERE categoria = ? AND estado = 'activo'";
        
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setString(1, categoria);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Producto producto = new Producto();
                    producto.setIdProducto(rs.getInt("id_producto"));
                    producto.setNombre(rs.getString("nombre"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setTalla(rs.getString("talla"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setStock(rs.getInt("stock"));
                    producto.setEstado(rs.getString("estado"));
                    producto.setImagen(rs.getBytes("imagen"));
                    
                    productos.add(producto);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener productos por categoría: " + e.getMessage());
            e.printStackTrace();
        }
        
        return productos;
    }
    
    public Producto obtenerProductoPorId(int idProducto) {
        Producto producto = null;
        String sql = "SELECT * FROM productos WHERE id_producto = ? AND estado = 'activo'";
        
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            stmt.setInt(1, idProducto);
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    producto = new Producto();
                    producto.setIdProducto(rs.getInt("id_producto"));
                    producto.setNombre(rs.getString("nombre"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setTalla(rs.getString("talla"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setStock(rs.getInt("stock"));
                    producto.setEstado(rs.getString("estado"));
                    producto.setImagen(rs.getBytes("imagen"));
                }
            }
        } catch (SQLException e) {
            System.err.println("Error al obtener producto por ID: " + e.getMessage());
            e.printStackTrace();
        }
        
        return producto;
    }
    
    public List<Producto> buscarProductos(String termino) {
        List<Producto> productos = new ArrayList<>();
        String sql = "SELECT * FROM productos WHERE (nombre LIKE ? OR categoria LIKE ?) AND estado = 'activo'";
        
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            
            String busqueda = "%" + termino + "%";
            stmt.setString(1, busqueda);
            stmt.setString(2, busqueda);
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Producto producto = new Producto();
                    producto.setIdProducto(rs.getInt("id_producto"));
                    producto.setNombre(rs.getString("nombre"));
                    producto.setPrecio(rs.getDouble("precio"));
                    producto.setTalla(rs.getString("talla"));
                    producto.setCategoria(rs.getString("categoria"));
                    producto.setStock(rs.getInt("stock"));
                    producto.setEstado(rs.getString("estado"));
                    producto.setImagen(rs.getBytes("imagen"));
                    
                    productos.add(producto);
                }
            }
        } catch (SQLException e) {
            System.err.println("Error al buscar productos: " + e.getMessage());
            e.printStackTrace();
        }
        
        return productos;
    }
}