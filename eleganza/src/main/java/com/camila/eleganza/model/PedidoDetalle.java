package com.camila.eleganza.model;

public class PedidoDetalle {
    private int idPedidoDetalle;
    private int idPedido;
    private int idProducto;
    private int cantidad;
    private double precioUnitario;

    public PedidoDetalle() {
    }

    public PedidoDetalle(int idPedidoDetalle, int idPedido, int idProducto, int cantidad, double precioUnitario) {
        this.idPedidoDetalle = idPedidoDetalle;
        this.idPedido = idPedido;
        this.idProducto = idProducto;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
    }

    public int getIdPedidoDetalle() {
        return idPedidoDetalle;
    }
    public void setIdPedidoDetalle(int idPedidoDetalle) {
        this.idPedidoDetalle = idPedidoDetalle;
    }
    public int getIdPedido() {
        return idPedido;
    }
    public void setIdPedido(int idPedido) {
        this.idPedido = idPedido;
    }
    public int getIdProducto() {
        return idProducto;
    }
    public void setIdProducto(int idProducto) {
        this.idProducto = idProducto;
    }
    public int getCantidad() {
        return cantidad;
    }
    public void setCantidad(int cantidad) {
        this.cantidad = cantidad;
    }
    public double getPrecioUnitario() {
        return precioUnitario;
    }
    public void setPrecioUnitario(double precioUnitario) {
        this.precioUnitario = precioUnitario;
    }

    @Override
    public String toString() {
        return "PedidoDetalle{" +
                "idPedidoDetalle=" + idPedidoDetalle +
                ", idPedido=" + idPedido +
                ", idProducto=" + idProducto +
                ", cantidad=" + cantidad +
                ", precioUnitario=" + precioUnitario +
                '}';
    }
}
