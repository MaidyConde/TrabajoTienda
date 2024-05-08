package com.tienda.tienda.service;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import com.tienda.tienda.interfaceService.IventasService;
import com.tienda.tienda.interfaces.Iventas;
import com.tienda.tienda.models.Ventas;

@Service
public class ventasService implements IventasService {

    @Autowired
    private Iventas data;

    @SuppressWarnings("null")
    @Override 
    public String save(Ventas Ventas) {
        data.save(Ventas);
        return Ventas.getIdVentas();
    }

    @Override
    public List<Ventas> filtroFechaVentas(Date fechaVentas) {
        List<Ventas> listaVentas =data.filtroFechaVentas(fechaVentas);
        return listaVentas;
    }

    @Override
    public List<Ventas> filtroClientesVentas(String filtro) {
        List<Ventas> listaVentas =data.filtroClientesVentas(filtro); 
        return listaVentas;
    }

     @Override
    public List<Ventas> findAll() {
        List<Ventas> listaVentas = (List<Ventas>) data.findAll();
        return listaVentas;
    }

    @Override
    public Optional<Ventas> findOne(String id) {
        @SuppressWarnings("null")
        Optional<Ventas> Ventas = data.findById(id);
        return Ventas;
    }

    @Override
    public int delete(String id) {
        data.deleteById(id);
        return 1;
    }
}
