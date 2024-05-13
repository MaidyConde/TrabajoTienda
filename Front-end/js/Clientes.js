// URL de la API
var url = "http://localhost:8080/api/v1/Clientes/";
// Función para listar los clientes
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



var RegistrarClienteBandera = true;
// Función para registrar un Cliente
function RegistrarCliente() {

    var tipoIdentificacion = document.getElementById("tipoIdentificacion");
    var Identificacion = document.getElementById("Identificacion");
    var nombreCliente = document.getElementById("nombreCliente");
    var apellidoCliente = document.getElementById("apellidoCliente");
    var Telefono = document.getElementById("Telefono");
    var Direccion = document.getElementById("Direccion");
    var Ciudad = document.getElementById("Ciudad");
    var Estado = document.getElementById("Estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validartipoidentificacion(tipoIdentificacion) ||
        !validaridentificacion(Identificacion) ||
        !validarnombrecliente(nombreCliente) ||
        !validarapellidocliente(apellidoCliente) ||
        !validartelefono(Telefono) ||
        !validardireccion(Direccion) ||
        !validarciudad(Ciudad) ||
        !validarestado(Estado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!1",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "tipoIdentificacion": tipoIdentificacion.value,
        "Identificacion": Identificacion.value,
        "nombreCliente": nombreCliente.value,
        "apellidoCliente": apellidoCliente.value,
        "Telefono": Telefono.value,
        "Direccion": Direccion.value,
        "Ciudad": Ciudad.value,
        "Estado": Estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (RegistrarClienteBandera == true) {
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
                    ListarCliente();
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
            text: "¡Llene todos los campos correctamente!2",
            icon: "error"
        });
    }
};

// Función para validar campos
// Función Documento Identidad
function validarCampos() {
    var Identificacion = document.getElementById("Identificacion");
    return validaridentificacion(Identificacion);
}

// Función para validar el documento de identidad
function validaridentificacion(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 5 || valor.length > 13) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}


function validarCampostipoidentificacion() {
    var tipoIdentificacion = document.getElementById("tipoIdentificacion");
    return validartipoidentificacion(tipoIdentificacion);
}

function validartipoidentificacion(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 11) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-select is-valid";
    } else {
        cuadroNumero.className = "form-select is-invalid";
    }

    return valido;
}

// Función nombrecliente
function validarCamposnombrecliente() {
    var nombreCliente = document.getElementById("nombreCliente");
    return validarnombrecliente(nombreCliente);
}

function validarnombrecliente(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función apellidocliente
function validarCamposapellidocliente() {
    var apellidoCliente = document.getElementById("apellidoCliente");
    return validarapellidocliente(apellidoCliente);
}

function validarapellidocliente(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función Telefono
function validarCampostelefono() {
    var Telefono = document.getElementById("Telefono");
    return validartelefono(Telefono);
}

function validartelefono(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 13) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

// Función direccion
function validarCamposdireccion() {
    var Direccion = document.getElementById("Direccion");
    return validardireccion(Direccion);
}

function validardireccion(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}

function validarCamposciudad() {
    var Ciudad = document.getElementById("Ciudad");
    return validarciudad(Ciudad);
}

function validarciudad(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 45) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}
// Función Estado
function validarCamposEstado() {
    var Estado = document.getElementById("Estado");
    return validarestado(Estado);
}

function validarestado(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 1 || valor.length > 2) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-select is-valid";
    } else {
        cuadroNumero.className = "form-select is-invalid";
    }

    return valido;
}

function AplicarFiltros(ciudad) {
    if (ciudad=== '') {
        listarCliente(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Clientes/busquedafiltrociudad/" + ciudad,
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

function AplicarFiltros(estado) {
    if (estado === '') {
        listarCliente(); // Mostrar todos los médicos si estado es vacío
    } else if (estado === 'A','I') {
        // Mostrar solo los médicos habilitados si estado es 'A'
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
            alert("Error al obtener los datos del cliente: " + error.statusText);
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