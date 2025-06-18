package com.camila.eleganza.model;

public class Usuario {
    private int id_usuario;
    private String nombre;
    private String correo;
    private String telefono;
    private String calle;
    private String ciudad;
    private String codigo_postal;
    private String pais;
    private String password;

    public Usuario() {
    }

    public Usuario(int id_usuario, String nombre, String correo, String telefono, String calle, String ciudad, String codigo_postal, String pais, String password) {
        this.id_usuario = id_usuario;
        this.nombre = nombre;
        this.correo = correo;
        this.telefono = telefono;
        this.calle = calle;
        this.ciudad = ciudad;
        this.codigo_postal = codigo_postal;
        this.pais = pais;
        this.password = password;

    }

    public int getId_usuario() {
        return id_usuario;
    }
    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }
    public String getNombre() {
        return nombre;
    }
    public void setNombre(String nombre) {
        this.nombre = nombre;
    }
    public String getCorreo() {
        return correo;
    }
    public void setCorreo(String correo) {
        this.correo = correo;
    }
    public String getTelefono() {
        return telefono;
    }
    public void setTelefono(String telefono) {
        this.telefono = telefono;
    }
    public String getCalle() {
        return calle;
    }
    public void setCalle(String calle) {
        this.calle = calle;
    }
    public String getCiudad() {
        return ciudad;
    }
    public void setCiudad(String ciudad) {
        this.ciudad = ciudad;
    }
    public String getCodigo_postal() {
        return codigo_postal;
    }
    public void setCodigo_postal(String codigo_postal) {
        this.codigo_postal = codigo_postal;
    }
    public String getPais() {
        return pais;
    }
    public void setPais(String pais) {
        this.pais = pais;
    }
    public String getPassword() {
        return password;
    }
    public void setPassword(String password) {
        this.password = password;
    }
    @Override
    public String toString() {
        return "Usuario{" + "id_usuario=" + id_usuario + ", nombre=" + nombre + ", correo=" + correo + ", telefono=" + telefono + ", calle=" + calle + ", ciudad=" + ciudad + ", codigo_postal=" + codigo_postal + ", pais=" + pais + ", password=" + password + '}';
    }
}
