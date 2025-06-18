package com.camila.eleganza.model;

import java.time.LocalDate;

public class Pedido {
    private int id_pedido;
    private int id_usuario;
    private LocalDate fechaPedido;

    public Pedido() {
    }

    public Pedido(int id_pedido, int id_usuario, LocalDate fechaPedido) {
        this.id_pedido = id_pedido;
        this.id_usuario = id_usuario;
        this.fechaPedido = fechaPedido;
    }

    public int getId_pedido() {
        return id_pedido;
    }

    public void setId_pedido(int id_pedido) {
        this.id_pedido = id_pedido;
    }

    public int getId_usuario() {
        return id_usuario;
    }

    public void setId_usuario(int id_usuario) {
        this.id_usuario = id_usuario;
    }

    public LocalDate getFechaPedido() {
        return fechaPedido;
    }

    public void setFechaPedido(LocalDate fechaPedido) {
        this.fechaPedido = fechaPedido;
    }

    @Override
    public String toString() {
        return "Pedido{" + "id_pedido=" + id_pedido + ", id_usuario=" + id_usuario + ", fechaPedido=" + fechaPedido + '}';
    }


}
