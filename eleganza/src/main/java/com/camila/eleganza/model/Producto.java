package com.camila.eleganza.model;

public class Producto {
    private int id_producto;
    private String nombre;
    private double precio;
    private String talla;
    private String categoria;
    private int stock;
    private String estado;
    private byte[] imagen;

    public Producto() {
    }

    public Producto(int id_producto, String nombre, double precio, String talla, String categoria, int stock, String estado, byte[] imagen) {
        this.id_producto = id_producto;
        this.nombre = nombre;
        this.precio = precio;
        this.talla = talla;
        this.categoria = categoria;
        this.stock = stock;
        this.estado = estado;
        this.imagen = imagen;
    }

    public int getId_producto() {
        return id_producto;
    }
    public void setId_producto(int id_producto) {
        this.id_producto = id_producto;
    }
    public String getNombre() {
        return nombre;
    }

    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public double getPrecio() {
        return precio;
    }
    public void setPrecio(double precio) {
        this.precio = precio;
    }
    public String getTalla() {
        return talla;
    }
    public void setTalla(String talla) {
        this.talla = talla;
    }
    public String getCategoria() {
        return categoria;
    }
    public void setCategoria(String categoria) {
        this.categoria = categoria;
    }
    public int getStock() {
        return stock;
    }
    public void setStock(int stock) {
        this.stock = stock;
    }
    public String getEstado() {
        return estado;
    }
    public void setEstado(String estado) {
        this.estado = estado;
    }
    public byte[] getImagen() {
        return imagen;
    }
    public void setImagen(byte[] imagen) {
        this.imagen = imagen;
    }
    @Override
    public String toString() {
        return "Producto{" + "id_producto=" + id_producto + ", nombre=" + nombre + ", precio=" + precio + ", talla=" + talla + ", categoria=" + categoria + ", stock=" + stock + ", estado=" + estado + ", imagen=" + imagen + '}';
    }
}
