/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Class.java to edit this template
 */
package com.spalacioc.mascotasymas;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

/**
 *
 * @author camila
 */
public class TestConexionBD {
    public static void main(String[] args) {
        String URL_DB = "jdbc:mariadb://localhost:3306/mascotasymas";
        String USER_DB = "root";
        String PASSWORD_DB = "spalacioc";

        try {
            Class.forName("org.mariadb.jdbc.Driver");
            Connection conexion = DriverManager.getConnection(URL_DB, USER_DB, PASSWORD_DB);
            System.out.println("Conexión exitosa: " + conexion);
            conexion.close();
        } catch (ClassNotFoundException e) {
            System.out.println("Error: MariaDB JDBC Driver no encontrado.");
        } catch (SQLException e) {
            System.out.println("Error al conectar a la base de datos: " + e.getMessage());
        }
    }
}