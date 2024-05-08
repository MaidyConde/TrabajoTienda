package com.tienda.tienda.interfaceService;

import java.sql.Date;
import java.util.List;
import java.util.Optional;

import com.tienda.tienda.models.Ventas;

public interface IventasService {

    public String save (Ventas Ventas);

    public List<Ventas> findAll();

    public List<Ventas> filtroFechaVentas(Date filtroVentas);

    public List<Ventas> filtroClientesVentas(String filtro);

    public Optional<Ventas> findOne(String id);

    public int delete(String id);

}
