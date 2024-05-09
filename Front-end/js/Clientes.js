// URL de la API
var url = "http://localhost:8080/api/v1/Clientes/";

// Función para listar los médicos
function listarCliente() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idClientes"]}</td>
                    <td class="text-center align-middle">${result[i]["tipoIdentificacion"]}</td>
                    <td class="text-center align-middle">${result[i]["identificacion"]}</td>
                    <td class="text-center align-middle">${result[i]["nombreCliente"]}</td>
                    <td class="text-center align-middle">${result[i]["apellidoCliente"]}</td>
                    <td class="text-center align-middle">${result[i]["telefono"]}</td>
                    <td class="text-center align-middle">${result[i]["direccion"]}</td>
                    <td class="text-center align-middle">${result[i]["ciudad"]}</td>
                    <td class="text-center align-middle">${result[i]["estado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarClienteBandera=false;" data-id="${result[i]["idClientes"]}"></i>
                        <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idClientes"]})" data-id="${result[i]["idClientes"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idClientes"]}"></i>
                    </td>
                `;
                cuerpoTabla.appendChild(trRegistro);
            }
        },
        error: function (error) {
            alert("Error en la petición: " + error);
        }
    });
}

var registrarClienteBandera = true;

// Función para registrar un médico
function registrarCliente() {
    var tipoIdentificacion = document.getElementById("tipoIdentificacion");
    var Identificacion = document.getElementById("identificacion");
    var nombreCliente = document.getElementById("nombreCliente");
    var apellidoCliente = document.getElementById("apellidoCliente");
    var Telefono = document.getElementById("telefono");
    var Direccion = document.getElementById("direccion");
    var Ciudad = document.getElementById("ciudad");
    var Estado = document.getElementById("estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarTipoIdentificacion(tipoIdentificacion) ||
        !validarIdentificacion(Identificacion) ||
        !validarNombreCliente(nombreCliente) ||
        !validarApellidoCliente(apellidoCliente) ||
        !validarTelefono(Telefono) ||
        !validarDireccion(Direccion) ||
        !validarCiudad(Ciudad) ||
        !validarEstado(Estado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "tipoIdentificacion": tipoIdentificacion.value,
        "Identificacion": Identificacion.value,
        "nombreCliente": nombreCliente.value,
        "apellidoCliente": apellidoCliente.value,
        "telefono": Telefono.value,
        "direccion": Direccion.value,
        "ciudad": Ciudad.value,
        "estado": Estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarClienteBandera == true) {
        metodo = "POST";
        urlLocal = url;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Registrado con éxito",
            icon: "success"
        });
    } else {
        metodo = "PUT";
        urlLocal = url + idClientes;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Guardado con éxito",
            icon: "success"
        });
    }

    if (validarCampos()) {
        $.ajax({
            url: urlLocal,
            type: metodo,
            data: forData,
            success: function (response) {
                Swal.fire({
                    title: "Éxito",
                    text: "Felicidades, Guardado con éxito",
                    icon: "success"
                }).then(function () {
                    // Aquí puedes agregar más acciones después del registro exitoso
                    $('#exampleModal').modal('hide');
                    listarCliente();
                });
            },
            error: function (xhr, status, error) {
                Swal.fire({
                    title: "Error",
                    text: "¡El número de documento ya se encuentra registrado!",
                    icon: "error"
                });
            }
        });
    } else {
        Swal.fire({
            title: "Error",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
    }
};


function buscarClientePorFiltro(filtro) {
    if (filtro=== '') {
        listarCliente(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Clientes/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idClientes"]}</td>
                        <td class="text-center align-middle">${result[i]["tipoIdentificacion"]}</td>
                        <td class="text-center align-middle">${result[i]["Identificacion"]}</td>
                        <td class="text-center align-middle">${result[i]["nombreCliente"]}</td>
                        <td class="text-center align-middle">${result[i]["apellidoCliente"]}</td>
                        <td class="text-center align-middle">${result[i]["Telefono"]}</td>
                        <td class="text-center align-middle">${result[i]["Direccion"]}</td>
                        <td class="text-center align-middle">${result[i]["Ciudad"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarClienteBandera=false;" data-id="${result[i]["idClientes"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idClientes"]})" data-id="${result[i]["idClientes"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idClientes"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    }
    
}

function buscarClientePorEstado(estado) {
    if (estado === '') {
        listarCliente(); // Mostrar todos los médicos si estado es vacío
    } else if (estado === 'A') {
        // Mostrar solo los médicos habilitados si estado es 'H'
        $.ajax({
            url: "http://localhost:8080/api/v1/Clientes/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idClientes"]}</td>
                        <td class="text-center align-middle">${result[i]["tipoIdentificacion"]}</td>
                        <td class="text-center align-middle">${result[i]["Identificacion"]}</td>
                        <td class="text-center align-middle">${result[i]["nombreCliente"]}</td>
                        <td class="text-center align-middle">${result[i]["apellidoCliente"]}</td>
                        <td class="text-center align-middle">${result[i]["Telefono"]}</td>
                        <td class="text-center align-middle">${result[i]["Direccion"]}</td>
                        <td class="text-center align-middle">${result[i]["Ciudad"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarClienteBandera=false;" data-id="${result[i]["idClientes"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idClientes"]})" data-id="${result[i]["idClientes"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idClientes"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    } else {
        // Mostrar solo los médicos deshabilitados si no es vacío ni 'A'
        $.ajax({
            url: "http://localhost:8080/api/v1/Cliente/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idClientes"]}</td>
                        <td class="text-center align-middle">${result[i]["tipoIdentificacion"]}</td>
                        <td class="text-center align-middle">${result[i]["Identificacion"]}</td>
                        <td class="text-center align-middle">${result[i]["nombreCliente"]}</td>
                        <td class="text-center align-middle">${result[i]["apellidoCliente"]}</td>
                        <td class="text-center align-middle">${result[i]["Telefono"]}</td>
                        <td class="text-center align-middle">${result[i]["Direccion"]}</td>
                        <td class="text-center align-middle">${result[i]["Ciudad"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarMedicoBandera=false;" data-id="${result[i]["idClientes"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idClientes"]})" data-id="${result[i]["idClientes"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idClientes"]}"></i>
                        </td>
                    `;
                    cuerpoTabla.appendChild(trRegistro);
                }
            },
            error: function (error) {
                alert("Error en la petición: " + error);
            }
        });
    }
}
// Función para limpiar campos del formulario
function limpiar() {
    document.getElementById("tipoIdentificacion").value = "";
    document.getElementById("tipoIdentificacion").className = "form-control";
    document.getElementById("Identificacion").value = "";
    document.getElementById("Identificacion").className = "form-control";
    document.getElementById("nombreCliente").value = "";
    document.getElementById("nombreCliente").className = "form-control";
    document.getElementById("apellidoCliente").value = "";
    document.getElementById("apellidoCliente").className = "form-control";
    document.getElementById("Telefono").value = "";
    document.getElementById("Telefono").className = "form-control";
    document.getElementById("Direccion").value = "";
    document.getElementById("Direccion").className = "form-control";
    document.getElementById("Ciudad").value = "";
    document.getElementById("Ciudad").className = "form-control";
    document.getElementById("Estado").value = "";
    document.getElementById("Estado").className = "form-control";
}

var idClientes = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idClientes = $(this).data("id");

    $.ajax({
        url: url + idClientes,
        type: "GET",
        success: function (clientes) {
            document.getElementById("tipoIdentificacion").value = clientes.tipoIdentificacion;
            document.getElementById("Identificacion").value = clientes.Identificacion;
            document.getElementById("nombreCliente").value = clientes.nombreCliente;
            document.getElementById("apellidoCliente").value = clientes.apellidoCliente;
            document.getElementById("Telefono").value = clientes.Telefono;
            document.getElementById("Direccion").value = clientes.Direccion;
            document.getElementById("Ciudad").value = clientes.Ciudad;
            document.getElementById("Estado").value = clientes.Estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del médico: " + error.statusText);
        }
    });
});

$(document).on("click", ".cambiarEstado", function () {
    var idClientes = $(this).data("id");
    $.ajax({
        url: url + idClientes,
        type: "DELETE",
        success: function () {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cambio de estado exitoso",
                showConfirmButton: false,
                timer: 1500
            });
            listarCliente(); // Actualiza la lista de pacientes en el front-end
        }
    });
});



$(document).on("click", ".eliminar", function () {
    // Obtener el ID del médico desde el atributo data del elemento clicado
    var idClientes = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este cliente?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idClientes,
                type: "DELETE",
                success: function (eliminarPermanente) {
                    // Mostrar un mensaje de éxito
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Registro Eliminado",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    // Actualizar la lista de médicos después de eliminar
                    listarCliente();
                },
                error: function (xhr, status, error) {
                    // Manejo de errores
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'El registro tiene un ingreso.'
                    });
                }
            });
        }
    });
});




// Llamar a la función para listar médicos al cargar la página
$(document).ready(function () {
    listarCliente();
});
function actualizarlistarCliente() {
    listarCliente();
}