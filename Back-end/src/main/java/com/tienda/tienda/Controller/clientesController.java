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
         // verificar que no exista el documento de identidad
        var listaClientes = clientesService.findAll()
                .stream().filter(clientes -> clientes.getIdentificacion()
                 .equals(Clientes.getIdentificacion()));
        if (listaClientes.count() != 0) {
     return new ResponseEntity<>("El cliente ya existe", HttpStatus.BAD_REQUEST); 
    }

    if (Clientes.getIdentificacion().equals("")) {
            
        return new ResponseEntity<>("El campo identificacion es obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (Clientes.getNombreCliente().equals("")) {
            
        return new ResponseEntity<>("El campo nombre es obligatorio", HttpStatus.BAD_REQUEST);
    }

    if (Clientes.getApellidoCliente().equals("")) {
            
        return new ResponseEntity<>("El campo apellido es obligatorio", HttpStatus.BAD_REQUEST); 
    }

    if (Clientes.getTelefono().equals("")) {
            
        return new ResponseEntity<>("El campo telefono es obligatorio", HttpStatus.BAD_REQUEST); 
    }

    if (Clientes.getDireccion().equals("")) {
            
        return new ResponseEntity<>("El campo direccion es obligatorio", HttpStatus.BAD_REQUEST); 
    }

    if (Clientes.getEstado().equals("")) {
            
        return new ResponseEntity<>("El campo estado es obligatorio", HttpStatus.BAD_REQUEST); 
    }

        clientesService.save(Clientes);
        return new ResponseEntity<>(Clientes, HttpStatus.OK);
    }

    @GetMapping("/")
    public ResponseEntity<Object> findAll() {
        var listaClientes = clientesService.findAll();
        return new ResponseEntity<>(listaClientes, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltro/{filtro}")
    public ResponseEntity<Object> findFiltro(@PathVariable String filtro) {
        var listaClientes = clientesService.filtroClientes(filtro);
        return new ResponseEntity<>(listaClientes, HttpStatus.OK); 
    }

    @GetMapping("/busquedafiltroestado/{estado}")
    public ResponseEntity<Object> findEstado(@PathVariable char estado) {
        var listaClientes = clientesService.filtroClientesEstado(estado);
        return new ResponseEntity<>(listaClientes, HttpStatus.OK);
    }

    @GetMapping("/busquedafiltrociudad/{ciudad}")
    public ResponseEntity<Object> findCiudad(@PathVariable String ciudad) {
        var listaClientes = clientesService.filtroClientesCiudad(ciudad);
        return new ResponseEntity<>(listaClientes, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Object> findOne(@PathVariable String id) {
        var Clientes = clientesService.findOne(id);
        return new ResponseEntity<>(Clientes, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> delete(@PathVariable String id) {
        var Clientes = clientesService.findOne(id).get();
        if (Clientes != null) {
            if (Clientes.getEstado().equals("A")) {

                Clientes.setEstado("I");
                clientesService.save(Clientes);
                return new ResponseEntity<>("inactivo correctamente", HttpStatus.OK);
            } else
                Clientes.setEstado("A");
                clientesService.save(Clientes);
            return new ResponseEntity<>("Se ha activado correctamente", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("No se ha encontrado el registro", HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping("/eliminarPermanente/{id}")
    public ResponseEntity<Object> deleteForever(@PathVariable String id) {
    clientesService.deleteForever(id);
    return new ResponseEntity<>("Registro eliminado Permanentemente", HttpStatus.OK);
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

