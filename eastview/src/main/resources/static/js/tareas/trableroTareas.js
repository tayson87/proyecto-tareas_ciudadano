(function () {
    // URL de la API que trae los ciudadanos 
    const apiUrl = 'http://69.164.193.25:8080/mcsvs/api/v1/tareas/listar';
    traerTareasCiudadanos(apiUrl);
})();

function traerTareasCiudadanos(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la API:', data);

            construirTablaTareas(data);
        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
        });
}
var tabla;
function construirTablaTareas(data) {
    tabla = $("#tableroTareas").DataTable({
        destroy: true,
        order: [[0, "desc"]],
        data: data,
        autoFill: false,
        responsive: true,
        select: true,
        search: true,
        menu: true,
        scrollX: true,
        lengthChange: true,
        lengthMenu: [
            [10, 20, -1],
            [10, 20, "Todas"],
        ],
        fnRowCallback: function (nRow, data) { },
        language: {
            lengthMenu: "Mostrar: _MENU_",
            search: "Buscar registros:",
            info: "Mostrando de _START_ a _END_ de un total de _TOTAL_ registros",
            sLoadingRecords: "Por favor espera - Cargando...",
            infoFiltered: "(filtrado de un total de _MAX_ registros)",
            infoEmpty: "Registros No disponibles.",
            infoPostFix: "",
            sEmptyTable: "Ning&#250;n dato disponible en esta tabla",
            zeroRecords: "No existen registros - Lo sentimos :(",
            paginate: {
                previous: "Anterior",
                next: "Siguiente",
                sLast: "&#218;ltima página",
            },
        },
        columnDefs: [
            {
                targets: -1, // Última columna
                data: null,
                defaultContent: '<button class="btn btn-primary btn-sm btn-editar" data-bs-toggle="modal" data-bs-target="#editarTareaModal">Editar</button>' +
                    '<button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>',
                className: 'center',// Centrar el contenido de la última columna
                type: 'string' // o 'html' dependiendo de los datos
            }
        ],
        columns: [
            {
                data: "idTarea",
                className: "center bolding",
                title: "#",
            },

            {
                data: "tarea",
                className: "center",
                title: "Nombre",
            },
                     {
                data: "diaTarea",
                className: "center",
                title: "Dia_Tarea",
            },
            {
                data: "ciudadanosAsignados",
                className: "center",
                title: "Ciudadanos_Asignado",
                render: function (data, type, full, meta) {

                    if (Array.isArray(data) && data.length > 0) {
                   
                        var tareas = data.map(function (tarea) {
                            return '<strong style="font-size: 1.1em;">' + tarea.nombre + '</strong>';
                        });
                        return tareas.join(', ');
                    } else {
                        // Mensaje cuando no hay tareas asignadas con estilo rojo, negrita y un tamaño ligeramente más grande
                        return '<span style="color: red; font-weight: bold; font-size: 1.1em;">Sin Asignar</span>';
                    }
                }
            },
            {
                data: null,
                className: "center",
                title: "Accion",
            },
        ],
    });

    // Evento de clic para el botón de editar
    $('#tableroTareas').on('click', '.btn-editar', function () {
        console.log("Editar registro");
        var tareaId = $(this).closest('tr').find('td:eq(0)').text(); // Obtener datos de la fila según la posición de la columna
        console.log('Editar:', tareaId);
        // Hacer la solicitud AJAX a la API
        $.ajax({
            url: 'http://69.164.193.25:8080/mcsvs/api/v1/tareas/tareaPorId/' + tareaId,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                // Llenar el modal con los datos obtenidos
                llenarModalEditarTarea(data);

                // Mostrar el modal de editar
                $('#editarTareaModal').modal('show');
            },
            error: function (error) {
                console.error('Error al obtener datos de la tarea:', error);
            }
        });
    });
    
    $('#tableroTareas').on('click', '.btn-eliminar', function () {
        var tareaId = $(this).closest('tr').find('td:eq(0)').text(); // Obtener datos de la fila según la posición de la columna
        console.log('Eliminar:', tareaId);
    
        // Mostrar el modal de confirmación con un retraso de 500 milisegundos (0.5 segundos)
        setTimeout(function() {
            $('#confirmarEliminarModal').modal('show');
        }, 500);
    
        // Agregar evento al botón "Confirmar" del modal con un retraso de 1000 milisegundos (1 segundo)
        $('#btnConfirmarEliminar').on('click', function () {
            // Ocultar el modal de confirmación con un retraso de 500 milisegundos (0.5 segundos)
            $('#confirmarEliminarModal').modal('hide');
    
            // Hacer la solicitud fetch para eliminar el ciudadano con un retraso de 1000 milisegundos (1 segundo)
            setTimeout(function() {
                fetch('http://69.164.193.25:8080/mcsvs/api/v1/tareas/eliminar/' + tareaId, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                      
                        // Redirigir después de eliminar con un retraso de 500 milisegundos (0.5 segundos)
                        setTimeout(function() {
                            window.location.href = "/app/tareas/tablero";
                        }, 500);
                    } else {
                        throw new Error('La solicitud fetch no fue exitosa: ' + response.status);
                    }
                })
                .catch(error => {
                    console.error('Error al eliminar el ciudadano:', error);
                    mostrarMensajeAdvertencia("No puedes eleiminar esta tarea no se ha terminado.");
                });
            }, 1000);
        });
    });
};

function llenarModalEditarTarea(data) {
    console.log(data);
    $('#tareasDetails').empty();
    var formContent = '<form id="editarCiudadanoForm">';

    formContent += '<div class="mb-3">';
    formContent += '<label for="nombreTarea" class="form-label">Nombre</label>';
    formContent += '<input type="text" class="form-control" id="nombreTarea" value="' + data.tarea + '">';
    formContent += '</div>';

    formContent += '<div class="mb-3">';
    formContent += '<label for="diaTarea" class="form-label">Dia</label>';
    formContent += '<input type="text" class="form-control" id="diaTarea" value="' + data.diaTarea + '">';
    formContent += '</div>';

    // Cerrar el formulario
    formContent += '<button type="submit" class="btn btn-primary">Actualizar</button>';
    formContent += '</form>';

    // Insertar el formulario en el div dentro del modal
    $('#tareasDetails').html(formContent);

    // Agregar evento submit al formulario
    $('#editarTareaModal').on('submit', function (event) {
        event.preventDefault();
        // Verifica los valores obtenidos
        console.log('Nombre actualizado:', $('#nombreTarea').val());
        console.log('Día actualizado:', $('#diaTarea').val());
        // Lógica para enviar el formulario a la API de actualización
        actualizartarea(data.idTarea);
    });
}

function actualizartarea(tareaId) {
    // Obtener los valores actualizados desde los inputs
    var nombreNuevo = $('#nombreTarea').val();
    var diaActualizada = $('#diaTarea').val();
    // Crear un objeto con los datos actualizados
    var datosActualizados = {
        idTarea: tareaId,
        tarea: nombreNuevo,
        diaTarea: diaActualizada
    };
   var json= JSON.stringify(datosActualizados);
   console.log(json);
    fetch('http://69.164.193.25:8080/mcsvs/api/v1/tareas/actualizar/' + tareaId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(response => response.json())
        .then(data => {
            window.location.href = "/app/tareas/tablero";
            console.log('Tarea actualizada con éxito:', data);
        })
        .catch(error => {
            console.error('Error al actualizar la tarea:', error);
        });
}
function mostrarMensajeAdvertencia(mensaje) {
    // Setear el mensaje en el modal
    document.getElementById("mensajeAdvertencia").innerText = mensaje;

    // Mostrar el modal
    var modal = new bootstrap.Modal(document.getElementById('modalAdvertencia'));
    modal.show();
}