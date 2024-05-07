package com.tienda.tienda.interfaceService;

import java.util.List;
import java.util.Optional;

import com.tienda.tienda.models.Productos;

public interface IproductosService {
    public String save (Productos Productos);

    public List<Productos> findAll();

    public Optional<Productos> findOne(String id);

    public int delete(String id);

}
