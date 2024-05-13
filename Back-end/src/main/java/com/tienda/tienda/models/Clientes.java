package com.tienda.tienda.models;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity(name = "Clientes") 
public class Clientes {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(name = "idClientes", nullable = false, length = 36)
    private String idClientes;

    @Column(name = "tipoIdentificacion", nullable = false, length = 3)
    private String tipoIdentificacion;

    @Column(name = "Identificacion", nullable = false, length = 10)
    private String Identificacion;

    @Column(name = "nombreCliente", nullable = false, length = 45)
    private String nombreCliente;

    @Column(name = "apellidoCliente", nullable = false, length = 45)
    private String apellidoCliente;

    @Column(name = "Telefono", nullable = false, length = 13)
    private String Telefono;

    @Column(name = "Direccion", nullable = false, length = 45)
    private String Direccion;

    @Column(name = "Ciudad", nullable = false, length = 45)
    private String Ciudad;

    @Column(name = "Correo", nullable = false, length = 100)
    private String Correo;

    @Column(name = "Estado", nullable = false, length = 1) 
    private String Estado;

    public Clientes() {
    }

    public Clientes(String idClientes, String tipoIdentificacion, String identificacion, String nombreCliente,
            String apellidoCliente, String telefono, String direccion, String ciudad, String correo, String estado) {
        this.idClientes = idClientes;
        this.tipoIdentificacion = tipoIdentificacion;
        Identificacion = identificacion;
        this.nombreCliente = nombreCliente;
        this.apellidoCliente = apellidoCliente;
        Telefono = telefono;
        Direccion = direccion;
        Ciudad = ciudad;
        Correo = correo;
        Estado = estado;
    }

    public String getIdClientes() {
        return idClientes;
    }

    public void setIdClientes(String idClientes) {
        this.idClientes = idClientes;
    }

    public String getTipoIdentificacion() {
        return tipoIdentificacion;
    }

    public void setTipoIdentificacion(String tipoIdentificacion) {
        this.tipoIdentificacion = tipoIdentificacion;
    }

    public String getIdentificacion() {
        return Identificacion;
    }

    public void setIdentificacion(String identificacion) {
        Identificacion = identificacion;
    }

    public String getNombreCliente() {
        return nombreCliente;
    }

    public void setNombreCliente(String nombreCliente) {
        this.nombreCliente = nombreCliente;
    }

    public String getApellidoCliente() {
        return apellidoCliente;
    }

    public void setApellidoCliente(String apellidoCliente) {
        this.apellidoCliente = apellidoCliente;
    }

    public String getTelefono() {
        return Telefono;
    }

    public void setTelefono(String telefono) {
        Telefono = telefono;
    }

    public String getDireccion() {
        return Direccion;
    }

    public void setDireccion(String direccion) {
        Direccion = direccion;
    }

    public String getCiudad() {
        return Ciudad;
    }

    public void setCiudad(String ciudad) {
        Ciudad = ciudad;
    }

    public String getCorreo() {
        return Correo;
    }

    public void setCorreo(String correo) {
        Correo = correo;
    }

    public String getEstado() {
        return Estado;
    }

    public void setEstado(String estado) {
        Estado = estado;
    }

    
}
