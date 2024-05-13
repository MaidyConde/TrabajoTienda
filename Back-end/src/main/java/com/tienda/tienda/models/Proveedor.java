package com.tienda.tienda.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "Proveedor") 
public class Proveedor {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idProveedor", nullable = false, length = 36)
    private String idProveedor;

    @Column(name = "Nit", nullable = false, length = 36)
    private String Nit;

    @Column(name = "razonSocial", nullable = false, length = 36)
    private String razonSocial;

    @Column(name = "nombreContacto", nullable = false, length = 36)
    private String nombreContacto;

    @Column(name = "cargoContacto", nullable = false, length = 36)
    private String cargoContacto;

    @Column(name = "telefonoContacto", nullable = false, length = 13)
    private String telefonoContacto;

    @Column(name = "Direccion", nullable = false, length = 100)
    private String Direccion;

    @Column(name = "Estado", nullable = false, length = 1)
    private String Estado;

    public Proveedor() {
    }

    public Proveedor(String idProveedor, String nit, String razonSocial, String nombreContacto, String cargoContacto,
            String telefonoContacto, String direccion, String estado) {
        this.idProveedor = idProveedor;
        Nit = nit;
        this.razonSocial = razonSocial;
        this.nombreContacto = nombreContacto;
        this.cargoContacto = cargoContacto;
        this.telefonoContacto = telefonoContacto;
        Direccion = direccion;
        Estado = estado;
    }

    public String getIdProveedor() {
        return idProveedor;
    }

    public void setIdProveedor(String idProveedor) {
        this.idProveedor = idProveedor;
    }

    public String getNit() {
        return Nit;
    }

    public void setNit(String nit) {
        Nit = nit;
    }

    public String getRazonSocial() {
        return razonSocial;
    }

    public void setRazonSocial(String razonSocial) {
        this.razonSocial = razonSocial;
    }

    public String getNombreContacto() {
        return nombreContacto;
    }

    public void setNombreContacto(String nombreContacto) {
        this.nombreContacto = nombreContacto;
    }

    public String getCargoContacto() {
        return cargoContacto;
    }

    public void setCargoContacto(String cargoContacto) {
        this.cargoContacto = cargoContacto;
    }

    public String getTelefonoContacto() {
        return telefonoContacto;
    }

    public void setTelefonoContacto(String telefonoContacto) {
        this.telefonoContacto = telefonoContacto;
    }

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String direccion) {
        Direccion = direccion;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }
}
