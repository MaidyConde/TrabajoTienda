package com.tienda.tienda.interfaceService;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.models.Clientes;

public interface IclientesService {
    public String save (Clientes Clientes);

    public List<Clientes> findAll();

    public Optional<Clientes> findOne(String id);

    public int delete(String id);

}
