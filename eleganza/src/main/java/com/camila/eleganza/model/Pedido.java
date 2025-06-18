package com.camila.eleganza.model;

import java.sql.Timestamp;

public class Pedido {
    private int idPedido;
    private int idUsuario;
    private Timestamp fecha;
    private double total;

    public Pedido() {
    }

    public Pedido(int idPedido, int idUsuario, Timestamp fecha, double total) {
        this.idPedido = idPedido;
        this.idUsuario = idUsuario;
        this.fecha = fecha;
        this.total = total;
    }

    public int getIdPedido() {
        return idPedido;
    }
    public void setIdPedido(int idPedido) {
        this.idPedido = idPedido;
    }
    public int getIdUsuario() {
        return idUsuario;
    }
    public void setIdUsuario(int idUsuario) {
        this.idUsuario = idUsuario;
    }
    public Timestamp getFecha() {
        return fecha;
    }
    public void setFecha(Timestamp fecha) {
        this.fecha = fecha;
    }
    public double getTotal() {
        return total;
    }
    public void setTotal(double total) {
        this.total = total;
    }
    @Override
    public String toString() {  
        return "Pedido{" +
                "idPedido=" + idPedido +
                ", idUsuario=" + idUsuario +
                ", fecha=" + fecha +
                ", total=" + total +
                '}';
    }
}
