package com.tienda.tienda.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tienda.tienda.interfaceService.IproductosService;
import com.tienda.tienda.interfaces.Iproductos;
import com.tienda.tienda.models.Productos;

@Service
public class productosService implements IproductosService {

    @Autowired
    private Iproductos data;

    @SuppressWarnings("null")
    @Override 
    public String save(Productos Productos) {
        data.save(Productos);
        return Productos.getIdProductos();
    }

     @Override
    public List<Productos> filtroProductos(String filtro) {
        List<Productos> listaProductos =data.filtroProductos(filtro);
        return listaProductos;
    }

    @Override
    public List<Productos> filtroProductosEstado(char estado) {
        List<Productos> listaProductos =data.filtroProductosEstado(estado);
        return listaProductos;
    }

    @Override
    public List<Productos> findAll() {
        List<Productos> listaProductos = (List<Productos>) data.findAll();
        return listaProductos;
    }

    @Override
    public Optional<Productos> findOne(String id) {
        @SuppressWarnings("null")
        Optional<Productos> Productos = data.findById(id);
        return Productos;
    }
    @SuppressWarnings("null")
    @Override
    public int deleteForever(String id) {
        data.deleteById(id);
        return 1;
    }
}
