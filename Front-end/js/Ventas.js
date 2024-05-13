// URL de la API
var url = "http://localhost:8080/api/v1/Ventas/";

// Función para listar los médicos
function listarVentas() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idVentas"]}</td>
                    <td class="text-center align-middle">${result[i]["clientes"]["nombreCliente"]} ${result[i]["clientes"]["apellidoCliente"]}</td>
                    <td class="text-center align-middle">${result[i]["total"]}</td>
                    <td class="text-center align-middle">${result[i]["fechaVenta"]}</td>
                    <td class="text-center align-middle">${result[i]["estado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarVentasBandera=false;" data-id="${result[i]["idVentas"]}"></i>
                        <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idVentas"]})" data-id="${result[i]["idVentas"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idVentas"]}"></i>
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

var registrarVentasBandera = true;

// Función para registrar un médico
function registrarVentas() {
    var clientes = document.getElementById("clientes");
    var Total = document.getElementById("Total");
    var fechaVenta = document.getElementById("fechaVenta");
    var Estado = document.getElementById("Estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarclientes(clientes) ||
        !validartotal(Total) ||
        !validarfechaventa(fechaVenta) ||
        !validarestado(Estado)) {
        // Mostrar una alerta indicando que todos los campos son obligatorios
        Swal.fire({
            title: "¡Error!",
            text: "¡Llene todos los campos correctamente!",
            icon: "error"
        });
        return; // Salir de la función si algún campo está vacío
    }

    var forData = {
        "clientes": clientes.value,
        "Total": Total.value,
        "fechaVenta": fechaVenta.value,
        "Estado": Estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarVentasBandera == true) {
        metodo = "POST";
        urlLocal = url;
        textoimprimir = Swal.fire({
            title: "LISTO",
            text: "Felicidades, Registrado con éxito",
            icon: "success"
        });
    } else {
        metodo = "PUT";
        urlLocal = url + idVentas;
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
                    listarVentas();
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

function validarCampos() {
    clientes = document.getElementById("clientes");
    return validarclientes(clientes);
}

// Función para validar el cliente
function validarclientes(cuadroNumero) {
    var valor = cuadroNumero.value;
    var valido = true;

    if (valor.length < 5 || valor.length > 155) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-control is-valid";
    } else {
        cuadroNumero.className = "form-control is-invalid";
    }

    return valido;
}


function validarCampostotal() {
    var Total = document.getElementById("Total");
    return validartotal(Total);
}

function validartotal(cuadroNumero) {
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

// Función fecha validar
function validarCamposfechaventa() {
    var fechaVenta = document.getElementById("fechaVenta");
    return validarfechaventa(fechaVenta);
}

function validarfechaventa(cuadroNumero) {
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

    if (valor.length < 1 || valor.length > 20) {
        valido = false;
    }

    if (valido) {
        cuadroNumero.className = "form-select is-valid";
    } else {
        cuadroNumero.className = "form-select is-invalid";
    }

    return valido;
}




function buscarVentasPorFiltro(filtro) {
    if (filtro=== '') {
        listarVentas(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Ventas/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idVentas"]}</td>
                        <td class="text-center align-middle">${result[i]["clientes"]["nombreCliente"]} ${result[i]["clientes"]["apellidoCliemte"]}</td>
                        <td class="text-center align-middle">${result[i]["total"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaVenta"]}</td>
                        <td class="text-center align-middle">${result[i]["estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarVentasBandera=false;" data-id="${result[i]["idVentas"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idVentas"]})" data-id="${result[i]["idVentas"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idVentas"]}"></i>
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

function buscarVentasPorEstado(estado) {
    if (estado === '') {
        listarVentas(); // Mostrar todos los médicos si estado es vacío
    } else if (estado === 'A') {
        // Mostrar solo los médicos habilitados si estado es 'H'
        $.ajax({
            url: "http://localhost:8080/api/v1/Ventas/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idVentas"]}</td>
                        <td class="text-center align-middle">${result[i]["clientes"]["nombreCliente"]} ${result[i]["clientes"]["apellidoCliemte"]}</td>
                        <td class="text-center align-middle">${result[i]["total"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaVenta"]}</td>
                        <td class="text-center align-middle">${result[i]["estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarVentasBandera=false;" data-id="${result[i]["idVentas"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idVentas"]})" data-id="${result[i]["idVentas"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idVentas"]}"></i>
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
            url: "http://localhost:8080/api/v1/Ventas/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idVentas"]}</td>
                        <td class="text-center align-middle">${result[i]["clientes"]["nombreCliente"]} ${result[i]["clientes"]["apellidoCliemte"]}</td>
                        <td class="text-center align-middle">${result[i]["total"]}</td>
                        <td class="text-center align-middle">${result[i]["fechaVenta"]}</td>
                        <td class="text-center align-middle">${result[i]["estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarVentasBandera=false;" data-id="${result[i]["idVentas"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idVentas"]})" data-id="${result[i]["idVentas"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idVentas"]}"></i>
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
    document.getElementById("clientes").value = "";
    document.getElementById("clientes").className = "form-control";
    document.getElementById("total").value = "";
    document.getElementById("total").className = "form-control";
    document.getElementById("fechaVenta").value = "";
    document.getElementById("fechaVenta").className = "form-control";
    document.getElementById("estado").value = "";
    document.getElementById("estado").className = "form-control";
}

var idProductos = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idVentas = $(this).data("id");

    $.ajax({
        url: url + idVentas,
        type: "GET",
        success: function (ventas) {
            document.getElementById("clientes").value = ventas.clientes;
            document.getElementById("total").value = ventas.Total;
            document.getElementById("fechaVenta").value = ventas.fechaVenta;
            document.getElementById("Estado").value = ventas.Estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos de ventas: " + error.statusText);
        }
    });
});

$(document).on("click", ".cambiarEstado", function () {
    var idVentas = $(this).data("id");
    $.ajax({
        url: url + idVentas,
        type: "DELETE",
        success: function () {
            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Cambio de estado exitoso",
                showConfirmButton: false,
                timer: 1500
            });
            listarProductos(); // Actualiza la lista de pacientes en el front-end
        }
    });
});



$(document).on("click", ".eliminar", function () {
    // Obtener el ID del médico desde el atributo data del elemento clicado
    var idVentas = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar esta venta?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idVentas,
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
                    listarProductos();
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
    listarVentas();
});
function actualizarlistarVentas() {
    listarVentas();
}