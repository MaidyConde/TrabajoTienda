package com.tienda.tienda.interfaces;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import com.tienda.tienda.models.Clientes;

public interface Iclientes extends CrudRepository< Clientes, String> {

    @Query("SELECT c FROM Clientes c WHERE c.nombreCliente LIKE %?1%")
    List<Clientes> filtroClientes(String filtro);

    @Query("SELECT c FROM Clientes c WHERE c.Ciudad LIKE %?1%")
    List<Clientes> filtroClientesCiudad(String ciudad);

    @Query("SELECT c FROM Clientes c WHERE c.Estado LIKE %?1%")
    List<Clientes> filtroClientesEstado(char estado); 
}
