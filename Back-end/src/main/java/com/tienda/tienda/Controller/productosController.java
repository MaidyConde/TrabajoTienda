package com.tienda.tienda.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tienda.tienda.interfaceService.IproductosService;
import com.tienda.tienda.models.Productos;

@RequestMapping("/api/v1/Productos/")
@RestController
public class productosController {
     @Autowired
    private IproductosService productosService;

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("Productos") Productos Productos) {
        
        productosService.save(Productos);
        return new ResponseEntity<>(Productos, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaProductos = productosService.findAll();
        return new ResponseEntity<>(listaProductos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Productos = productosService.findOne(id);
        return new ResponseEntity<>(Productos, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
    productosService.delete(id);
    return new ResponseEntity<>("Registro eliminado", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Productos") Productos ProductosUpdate) {
        var Productos = productosService.findOne(id).get();
        if (Productos != null) {

            Productos.setNombreProducto(ProductosUpdate.getNombreProducto());
            Productos.setDescripcion(ProductosUpdate.getDescripcion());
            Productos.setCantidad(ProductosUpdate.getCantidad());
            Productos.setPrecio(ProductosUpdate.getPrecio());
            Productos.setIva(ProductosUpdate.getIva());
            Productos.setDescuento(ProductosUpdate.getDescuento());
            Productos.setEstado(ProductosUpdate.getEstado());
          
            productosService.save(Productos);
            return new ResponseEntity<>(Productos, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error producto NO Encontrado", HttpStatus.BAD_REQUEST);
        }
    }


}
