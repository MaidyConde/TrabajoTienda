package com.tienda.tienda.interfaces;

import org.springframework.data.repository.CrudRepository;
import com.tienda.tienda.models.Clientes;

public interface Iclientes extends CrudRepository< Clientes, String> {

}
