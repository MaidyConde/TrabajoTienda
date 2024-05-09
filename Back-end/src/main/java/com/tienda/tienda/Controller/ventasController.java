package com.tienda.tienda.Controller;

import java.sql.Date;

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

import com.tienda.tienda.interfaceService.IventasService;
import com.tienda.tienda.models.Ventas;

@RequestMapping("/api/v1/Ventas/")
@RestController
public class ventasController {

    @Autowired
    private IventasService ventasService; 

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("Ventas") Ventas Ventas) {

        if (Ventas.getTotal().equals("")) {
            
          return new ResponseEntity<>("El campo total es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Ventas.getFechaVenta().equals("")) {
            
            return new ResponseEntity<>("El campo fecha venta es obligatorio", HttpStatus.BAD_REQUEST);
        }

        if (Ventas.getEstado().equals("")) {
            
            return new ResponseEntity<>("El campo estado es obligatorio", HttpStatus.BAD_REQUEST);
        }

        ventasService.save(Ventas);
        return new ResponseEntity<>(Ventas, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaVentas = ventasService.findAll();
        return new ResponseEntity<>(listaVentas, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{fechaVentas}")
    public ResponseEntity<Object> findfechaVentas(@PathVariable Date fechaVentas) {
        var listaVentas = ventasService.filtroFechaVentas(fechaVentas);
        return new ResponseEntity<>(listaVentas, HttpStatus.OK); 
    }

    @GetMapping("/busquedafiltroventas/{filtro}")
    public ResponseEntity<Object> findIdCliente(@PathVariable String filtro) {
        var listaVentas = ventasService.filtroClientesVentas(filtro);
        return new ResponseEntity<>(listaVentas, HttpStatus.OK);
    }

     @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Ventas = ventasService.findOne(id);
        return new ResponseEntity<>(Ventas, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        var Ventas = ventasService.findOne(id).get();
        if (Ventas != null) {
            if (Ventas.getEstado().equals("A")) {

                Ventas.setEstado("I");
                ventasService.save(Ventas);
                return new ResponseEntity<>("inactivo correctamente", HttpStatus.OK);
            } else
            Ventas.setEstado("A");
                ventasService.save(Ventas);
            return new ResponseEntity<>("Se ha activado correctamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se ha encontrado el registro", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
    ventasService.deleteForever(id);
    return new ResponseEntity<>("Registro eliminado Permanentemente", HttpStatus.OK);
    }



    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Ventas") Ventas VentasUpdate) {
        var Ventas = ventasService.findOne(id).get();
        if (Ventas != null) {

            Ventas.setTotal(VentasUpdate.getTotal());
            Ventas.setFechaVenta(VentasUpdate.getFechaVenta());
            Ventas.setEstado(VentasUpdate.getEstado());
          
            ventasService.save(Ventas);
            return new ResponseEntity<>(Ventas, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error venta NO Encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}

