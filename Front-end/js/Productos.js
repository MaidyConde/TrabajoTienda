// URL de la API
var url = "http://localhost:8080/api/v1/Productos/";

// Función para listar los médicos
function listarProductos() {
    $.ajax({
        url: url,
        type: "GET",
        success: function (result) {
            var cuerpoTabla = document.getElementById("cuerpoTabla");
            cuerpoTabla.innerHTML = "";

            for (var i = 0; i < result.length; i++) {
                var trRegistro = document.createElement("tr");
                trRegistro.innerHTML = `
                    <td>${result[i]["idProductos"]}</td>
                    <td class="text-center align-middle">${result[i]["nombreProducto"]}</td>
                    <td class="text-center align-middle">${result[i]["descripcion"]}</td>
                    <td class="text-center align-middle">${result[i]["cantidad"]}</td>
                    <td class="text-center align-middle">${result[i]["precio"]}</td>
                    <td class="text-center align-middle">${result[i]["iva"]}</td>
                    <td class="text-center align-middle">${result[i]["descuento"]}</td>
                    <td class="text-center align-middle">${result[i]["estado"]}</td>
                    <td class="text-center align-middle">
                        <i class="fas fa-edit editar"  onclick="registrarProductosBandera=false;" data-id="${result[i]["idProductos"]}"></i>
                        <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idProductos"]})" data-id="${result[i]["idProductos"]}"></i>
                        <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idProductos"]}"></i>
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

var registrarProductosBandera = true;

// Función para registrar un médico
function registrarProductos() {
    var nombreProducto = document.getElementById("nombreProducto");
    var Descripcion = document.getElementById("Descripcion");
    var Cantidad = document.getElementById("Cantidad");
    var Precio = document.getElementById("Precio");
    var Iva = document.getElementById("Iva");
    var Descuento = document.getElementById("Descuento");
    var Estado = document.getElementById("Estado");

    // Verificar si algún campo obligatorio está vacío
    if (!validarNombreProducto(nombreProducto) ||
        !validarDescripcion(Descripcion) ||
        !validarCantidad(Cantidad) ||
        !validarPrecio(Precio) ||
        !validarIva(Iva) ||
        !validarDescuento(Descuento) ||
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
        "nombreProducto": nombreProducto.value,
        "Descripcion": Descripcion.value,
        "Cantidad": Cantidad.value,
        "Precio": Precio.value,
        "Iva": Iva.value,
        "Descuento": Descuento.value,
        "Estado": Estado.value,
    };

    var metodo = "";
    var urlLocal = "";
    var textoimprimir = "";
    if (registrarProductosBandera == true) {
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


function buscarProductosPorFiltro(filtro) {
    if (filtro=== '') {
        listarProductos(); // Mostrar todos los médicos si estado es vacío
    }else{
        $.ajax({
            url: "http://localhost:8080/api/v1/Productos/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
    
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idProductos"]}</td>
                        <td class="text-center align-middle">${result[i]["nombreProducto"]}</td>
                        <td class="text-center align-middle">${result[i]["Descripcion"]}</td>
                        <td class="text-center align-middle">${result[i]["Cantidad"]}</td>
                        <td class="text-center align-middle">${result[i]["Precio"]}</td>
                        <td class="text-center align-middle">${result[i]["Iva"]}</td>
                        <td class="text-center align-middle">${result[i]["Descuento"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarProductosBandera=false;" data-id="${result[i]["idProductos"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idProductos"]})" data-id="${result[i]["idProductos"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idProductos"]}"></i>
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

function buscarProductosPorEstado(estado) {
    if (estado === '') {
        listarProductos(); // Mostrar todos los médicos si estado es vacío
    } else if (estado === 'A') {
        // Mostrar solo los médicos habilitados si estado es 'H'
        $.ajax({
            url: "http://localhost:8080/api/v1/Productos/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idProductos"]}</td>
                        <td class="text-center align-middle">${result[i]["nombreProducto"]}</td>
                        <td class="text-center align-middle">${result[i]["Descripcion"]}</td>
                        <td class="text-center align-middle">${result[i]["Cantidad"]}</td>
                        <td class="text-center align-middle">${result[i]["Precio"]}</td>
                        <td class="text-center align-middle">${result[i]["Iva"]}</td>
                        <td class="text-center align-middle">${result[i]["Descuento"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarProductosBandera=false;" data-id="${result[i]["idProductos"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idProductos"]})" data-id="${result[i]["idProductos"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idProductos"]}"></i>
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
            url: "http://localhost:8080/api/v1/Productos/busquedafiltroestado/" + estado,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";

                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                        <td>${result[i]["idProductos"]}</td>
                        <td class="text-center align-middle">${result[i]["nombreProducto"]}</td>
                        <td class="text-center align-middle">${result[i]["Descripcion"]}</td>
                        <td class="text-center align-middle">${result[i]["Cantidad"]}</td>
                        <td class="text-center align-middle">${result[i]["Precio"]}</td>
                        <td class="text-center align-middle">${result[i]["Iva"]}</td>
                        <td class="text-center align-middle">${result[i]["Descuento"]}</td>
                        <td class="text-center align-middle">${result[i]["Estado"]}</td>
                        <td class="text-center align-middle">
                            <i class="fas fa-edit editar"  onclick="registrarProductosBandera=false;" data-id="${result[i]["idProductos"]}"></i>
                            <i class="fas fa-user-slash cambiarEstado" onclick="cambiarEstado(${result[i]["idProductos"]})" data-id="${result[i]["idProductos"]}"></i>
                            <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idProductos"]}"></i>
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
    document.getElementById("nombreProducto").value = "";
    document.getElementById("nombreProducto").className = "form-control";
    document.getElementById("Descripcion").value = "";
    document.getElementById("Descripcion").className = "form-control";
    document.getElementById("Cantidad").value = "";
    document.getElementById("Cantidad").className = "form-control";
    document.getElementById("Precio").value = "";
    document.getElementById("Precio").className = "form-control";
    document.getElementById("Iva").value = "";
    document.getElementById("Iva").className = "form-control";
    document.getElementById("Descuento").value = "";
    document.getElementById("Descuento").className = "form-control";
    document.getElementById("Estado").value = "";
    document.getElementById("Estado").className = "form-control";
}

var idProductos = "";
// Asociar eventos de clic a los iconos dentro de la tabla
$(document).on("click", ".editar", function () {
    limpiar();
    idProductos = $(this).data("id");

    $.ajax({
        url: url + idProductos,
        type: "GET",
        success: function (productos) {
            document.getElementById("nombreProducto").value = productos.nombreProducto;
            document.getElementById("Descripcion").value = productos.Descripcion;
            document.getElementById("Cantidad").value = productos.Cantidad;
            document.getElementById("Precio").value = productos.Precio;
            document.getElementById("Iva").value = productos.Iva;
            document.getElementById("Descuento").value = productos.Descuento;
            document.getElementById("Estado").value = productos.Estado;
            $('#exampleModal').modal('show');
        },
        error: function (error) {
            alert("Error al obtener los datos del médico: " + error.statusText);
        }
    });
});

$(document).on("click", ".cambiarEstado", function () {
    var idProductos = $(this).data("id");
    $.ajax({
        url: url + idProductos,
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
    var idProductos = $(this).data("id");

    // Mostrar un cuadro de diálogo para confirmar la eliminación
    Swal.fire({
        title: '¿Estás seguro?',
        text: "¿Deseas eliminar este producto?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Eliminar'
    }).then((result) => {
        // Si el usuario confirma la eliminación, proceder con la solicitud AJAX
        if (result.isConfirmed) {
            $.ajax({
                url: url + "eliminarPermanente/" + idProductos,
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
    listarProductos();
});
function actualizarlistarProductos() {
    listarProductos();
}