package com.camila.eleganza.dao;

import com.camila.eleganza.model.Usuario;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class UsuarioDAO {

    // Crear un nuevo usuario
    public boolean crearUsuario(Usuario usuario) {
        String sql = "INSERT INTO usuario (nombre, correo, telefono, calle, ciudad, codigoPostal, pais, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, usuario.getNombre());
            stmt.setString(2, usuario.getCorreo());
            stmt.setString(3, usuario.getTelefono());
            stmt.setString(4, usuario.getCalle());
            stmt.setString(5, usuario.getCiudad());
            stmt.setString(6, usuario.getCodigoPostal());
            stmt.setString(7, usuario.getPais());
            stmt.setString(8, usuario.getPassword());
            int filas = stmt.executeUpdate();
            return filas > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

    // Buscar usuario por correo
    public Usuario buscarPorCorreo(String correo) {
        String sql = "SELECT * FROM usuario WHERE correo = ?";
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql)) {
            stmt.setString(1, correo);
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Usuario usuario = new Usuario();
                    usuario.setIdUsuario(rs.getInt("idUsuario"));
                    usuario.setNombre(rs.getString("nombre"));
                    usuario.setCorreo(rs.getString("correo"));
                    usuario.setTelefono(rs.getString("telefono"));
                    usuario.setCalle(rs.getString("calle"));
                    usuario.setCiudad(rs.getString("ciudad"));
                    usuario.setCodigoPostal(rs.getString("codigoPostal"));
                    usuario.setPais(rs.getString("pais"));
                    usuario.setPassword(rs.getString("password"));
                    return usuario;
                }
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    // Listar todos los usuarios
    public List<Usuario> listarUsuarios() {
        List<Usuario> usuarios = new ArrayList<>();
        String sql = "SELECT * FROM usuario";
        try (Connection conn = ConexionBD.getConnection();
             PreparedStatement stmt = conn.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            while (rs.next()) {
                Usuario usuario = new Usuario();
                usuario.setIdUsuario(rs.getInt("idUsuario"));
                usuario.setNombre(rs.getString("nombre"));
                usuario.setCorreo(rs.getString("correo"));
                usuario.setTelefono(rs.getString("telefono"));
                usuario.setCalle(rs.getString("calle"));
                usuario.setCiudad(rs.getString("ciudad"));
                usuario.setCodigoPostal(rs.getString("codigoPostal"));
                usuario.setPais(rs.getString("pais"));
                usuario.setPassword(rs.getString("password"));
                usuarios.add(usuario);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return usuarios;
    }