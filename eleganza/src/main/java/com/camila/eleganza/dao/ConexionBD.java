package com.camila.eleganza.dao;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
/*
 *
 * @author camila
 */
public class ConexionBD {
    private static final String URL_DB = "jdbc:mysql://localhost:3306/bdboutique";
    private static final String USER_DB = "root";
    private static final String PASSWORD_DB = "macacapi123.";

    // Conexión a la base de datos
    public static Connection getConnection() {
        Connection conexion = null;
        try {
            // Cambiar el driver a MySQL
            Class.forName("com.mysql.cj.jdbc.Driver");
            System.out.println("Conectando a la base de datos...");
            // Le pasamos la URL de la base de datos, el usuario y la contraseña para conectarnos a la base de datos
            conexion = DriverManager.getConnection(URL_DB, USER_DB, PASSWORD_DB);
            System.out.println(conexion);
        } catch (ClassNotFoundException e) {
            System.out.println("Error: MySQL JDBC Driver no encontrado.");
        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos: " + e.getMessage());
            e.printStackTrace();
        }
        return conexion;
    }
}