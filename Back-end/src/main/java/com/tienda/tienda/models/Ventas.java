package com.tienda.tienda.models;

import java.sql.Date;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "Ventas") 
public class Ventas {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idVentas", nullable = false, length = 36)
    private String idVentas;

    @ManyToOne
    @JoinColumn(name="idClientes")
    private Clientes Clientes;

    @Column(name = "Total", nullable = false, length = 36)
    private String Total;

    @Column(name = "fechaVenta", nullable = false, length = 36)
    private Date fechaVenta;

    @Column(name = "Estado", nullable = false, length = 36)
    private String Estado;

    public Ventas() {
    }

    public Ventas(String idVentas, com.tienda.tienda.models.Clientes clientes, String total, Date fechaVenta,
            String estado) {
        this.idVentas = idVentas;
        Clientes = clientes;
        Total = total;
        this.fechaVenta = fechaVenta;
        Estado = estado;
    }

    public String getIdVentas() {
        return idVentas;
    }

    public void setIdVentas(String idVentas) {
        this.idVentas = idVentas;
    }

    public Clientes getClientes() {
        return Clientes;
    }

    public void setClientes(Clientes clientes) {
        Clientes = clientes;
    }

    public String getTotal() {
        return Total;
    }

    public void setTotal(String total) {
        Total = total;
    }

    public Date getFechaVenta() {
        return fechaVenta;
    }

    public void setFechaVenta(Date fechaVenta) {
        this.fechaVenta = fechaVenta;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }

}
