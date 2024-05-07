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

import com.tienda.tienda.interfaceService.IclientesService;
import com.tienda.tienda.models.Clientes;


@RequestMapping("/api/v1/Clientes/")
@RestController
public class clientesController {

    @Autowired
    private IclientesService clientesService;

    @PostMapping("/")
    public ResponseEntity<Object> save (@ModelAttribute("Clientes") Clientes Clientes) {
        
        clientesService.save(Clientes);
        return new ResponseEntity<>(Clientes, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaClientes = clientesService.findAll();
        return new ResponseEntity<>(listaClientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Clientes = clientesService.findOne(id);
        return new ResponseEntity<>(Clientes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
    clientesService.delete(id);
    return new ResponseEntity<>("Registro eliminado", HttpStatus.OK);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Object> update(@PathVariable String id, @ModelAttribute("Clientes") Clientes ClientesUpdate) {
        var Clientes = clientesService.findOne(id).get();
        if (Clientes != null) {

            Clientes.setTipoIdentificacion(ClientesUpdate.getTipoIdentificacion());
            Clientes.setIdentificacion(ClientesUpdate.getIdentificacion());
            Clientes.setNombreCliente(ClientesUpdate.getNombreCliente());
            Clientes.setApellidoCliente(ClientesUpdate.getApellidoCliente());
            Clientes.setTelefono(ClientesUpdate.getTelefono());
            Clientes.setDireccion(ClientesUpdate.getDireccion());
            Clientes.setCiudad(ClientesUpdate.getCiudad());
            Clientes.setEstado(ClientesUpdate.getEstado());
          
            clientesService.save(Clientes);
            return new ResponseEntity<>(Clientes, HttpStatus.OK);

        } else {
            return new ResponseEntity<>("Error cliente NO Encontrado", HttpStatus.BAD_REQUEST);
        }
    }
}

