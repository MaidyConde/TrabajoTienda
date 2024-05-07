package com.tienda.tienda.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.tienda.interfaceService.IclientesService;
import com.tienda.tienda.interfaces.Iclientes;
import com.tienda.tienda.models.Clientes;

@Service
public class clientesService implements IclientesService {
    @Autowired
    private Iclientes data;

    @SuppressWarnings("null")
    @Override 
    public String save(Clientes Clientes) {
        data.save(Clientes);
        return Clientes.getIdClientes();
    }

    @Override
    public List<Clientes> findAll() {
        List<Clientes> listaClientes = (List<Clientes>) data.findAll();
        return listaClientes;
    }

    @Override
    public Optional<Clientes> findOne(String id) {
        @SuppressWarnings("null")
        Optional<Clientes> Clientes = data.findById(id);
        return Clientes;
    }

    @Override
    public int delete(String id) {
        data.deleteById(id);
        return 1;
    }

}
