package com.tienda.tienda.interfaces;

import java.sql.Date;
import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import com.tienda.tienda.models.Ventas;

public interface Iventas extends CrudRepository< Ventas, String> {

    @Query ("SELECT v FROM Ventas v WHERE v.fechaVenta = ?1 ")
    List<Ventas>filtroFechaVentas(Date fechaVentas);
    
    @Query("SELECT v FROM Clientes v WHERE v.idClientes LIKE %?1%")
    List<Ventas> filtroClientesVentas(String filtro);

}
