function buscarClientePorFiltro(filtro) {
    if (filtro === '') {
        listarClientes(); // Mostrar todos los médicos si estado es vacío
    } else {
        $.ajax({
            url: "http://localhost:8080/api/v1/Clientes/busquedafiltro/" + filtro,
            type: "GET",
            success: function (result) {
                var cuerpoTabla = document.getElementById("cuerpoTabla");
                cuerpoTabla.innerHTML = "";
                for (var i = 0; i < result.length; i++) {
                    var trRegistro = document.createElement("tr");
                    trRegistro.innerHTML = `
                <td>${result[i]["idCliente"]}</td>
                <td class="text-center align-middle">${result[i]["habitacion"]}</td>
                <td class="text-center align-middle">${result[i]["cama"]}</td>
                <td class="text-center align-middle">${result[i]["paciente"]["documentoIdentidad"]} ${result[i]["paciente"]["primerNombre"]} ${result[i]["paciente"]["primerApellido"]}</td>
                <td class="text-center align-middle">${result[i]["medico"]["documentoIdentidad"]} ${result[i]["medico"]["primerNombre"]} ${result[i]["medico"]["primerApellido"]}</td>
                <td class="text-center align-middle">${result[i]["fechaIngreso"]}</td>
                <td class="text-center align-middle">${result[i]["fechaSalida"]}</td>
                <td class="text-center align-middle">${result[i]["estado"]}</td>
                <td class="text-center align-middle">
                <i class="fas fa-edit editar"  onclick="registrarIngresoBandera=false;" data-id="${result[i]["idCliente"]}"></i> 
                <i class="fas fa-user-slash cambiarEstado" data-id="${result[i]["idCliente"]}"></i>
                <i class="fas fa-trash-alt eliminar" data-id="${result[i]["idCliente"]}"></i>
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