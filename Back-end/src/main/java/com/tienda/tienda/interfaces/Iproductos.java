package com.tienda.tienda.interfaces;

import org.springframework.data.repository.CrudRepository;

import com.tienda.tienda.models.Productos;

public interface Iproductos extends CrudRepository< Productos, String> {

}
