package com.tienda.tienda.interfaceService;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.models.Clientes;

public interface IclientesService {
    public String save (Clientes Clientes);

    public List<Clientes> findAll();

    public List<Clientes> filtroClientes(String filtro);

    public List<Clientes> filtroClientesEstado(char estado); 

    public List<Clientes> filtroClientesCiudad(String ciudad);

    public Optional<Clientes> findOne(String id);

    public int deleteForever(String id);

}
