(function () {
    // URL de la API que trae los ciudadanos 
    const apiUrl = 'http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/listar';
    const apuUrlTareas = 'http://69.164.193.25:8080/mcsvs/api/v1/tareas/listar';
    traerCiudadanosTareas(apiUrl);
    traerTareasCiudadanos(apuUrlTareas);

})();

function traerTareasCiudadanos(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la API:', data);
            // Organizar las tareas por día de la semana
            // Supongamos que 'data' es tu lista de tareas

            // Inicializar tareasPorDia
            const tareasPorDia = {};

            // Organizar las tareas por día de la semana
            data.forEach((tarea) => {
                tarea.diaTarea = tarea.diaTarea.toUpperCase(); // Asegurarse de que el día esté en mayúsculas
                if (!tareasPorDia[tarea.diaTarea]) {
                    tareasPorDia[tarea.diaTarea] = [];
                }
                tareasPorDia[tarea.diaTarea].push(tarea);
            });

            // Crear las columnas de la tabla
            const columnas = Object.keys(tareasPorDia).map((dia) => {
                return {
                    data: dia,
                    className: "center bolding",
                    title: dia,
                    render: function (data, type, full, meta) {
                        if (Array.isArray(data) && data.length > 0) {
                            var tareas = data.map(function (tarea) {
                                return tarea.tarea;
                            });
                            return tareas.join('<br>'); // Cambiar coma por salto de línea para mostrar múltiples tareas
                        } else {
                            return 'Sin Tareas';
                        }
                    }
                };
            });

            // Configurar la tabla con las columnas
            const configuracionTabla = {
                destroy: true,
                order: [[0, "desc"]],
                data: Object.values(tareasPorDia),
                autoFill: false,
                responsive: true,
                select: true,
                search: true,
                menu: true,
                scrollX: true,
                lengthChange: true,
                lengthMenu: [
                    [5, 10, -1],
                    [5, 10, "Todas"],
                ],
                fnRowCallback: function (nRow, data) { },
                language: {
                    // ... Configuración del idioma
                },
                columns: columnas,
            };

            // Inicializar la tabla
            tabla = $("#diasSemana").DataTable(configuracionTabla);

        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
        });
}

function traerCiudadanosTareas(apiUrl) {
    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Error de red - ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            console.log('Datos de la API:', data);
            getDataAndConstrDataTable(data);

        })
        .catch(error => {
            console.error('Error al hacer la solicitud:', error);
        });
}

var tabla;
function getDataAndConstrDataTable(data) {
    tabla = $("#tareasCiudadanos").DataTable({
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
                data: null, // Puedes asociar esta columna con datos específicos o nulos
                defaultContent: '<button class="btn btn-primary btn-sm btn-editar" data-bs-toggle="modal" data-bs-target="#editarCiudadanoModal">Editar</button>' +
                    '<button class="btn btn-danger btn-sm btn-eliminar">Eliminar</button>',
            }
        ],
        columns: [
            {
                data: "id",
                className: "center bolding",
                title: "#",
            },

            {
                data: "nombre",
                className: "center",
                title: "Nombre",
            },
            {
                data: "edad",
                className: "center",
                title: "Edad",
            },
            {
                data: "sexo",
                className: "center",
                title: "Sexo",
            },
            {
                data: "tareasAsignadas",
                className: "center",
                title: "Tareas Asignadas",
                render: function (data, type, full, meta) {
                    if (Array.isArray(data) && data.length > 0) {
                        // Si hay tareas asignadas, mapea y muestra las tareas en negrita y un tamaño ligeramente más grande
                        var tareas = data.map(function (tarea) {
                            return '<strong style="font-size: 1.1em;">' + tarea.tarea + '</strong>';
                        });
                        return tareas.join(', ');
                    } else {
                        // Mensaje cuando no hay tareas asignadas con estilo rojo, negrita y un tamaño ligeramente más grande
                        return '<span style="color: red; font-weight: bold; font-size: 1.1em;">Sin Tareas</span>';
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

    // Agregar eventos para los botones (puedes usar delegación de eventos para mejorar la eficiencia)
    $('#tareasCiudadanos').on('click', '.btn-editar', function () {
        console.log("Editar");
        var ciudadanoId = $(this).closest('tr').find('td:eq(0)').text(); // Obtener datos de la fila según la posición de la columna
        console.log('Editar:', ciudadanoId);
        // Hacer la solicitud AJAX a la API
        $.ajax({
            url: 'http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/buscarPorId/' + ciudadanoId,
            method: 'GET',
            dataType: 'json',
            success: function (data) {
                console.log(data);
                llenarModal(data);

                // Mostrar el modal
                $('#editarCiudadanoModal').modal('show');
            },
            error: function (error) {
                console.error('Error al obtener datos del ciudadano:', error);
            }
        });
    });

$('#tareasCiudadanos').on('click', '.btn-eliminar', function () {
    var ciudadanoId = $(this).closest('tr').find('td:eq(0)').text(); // Obtener datos de la fila según la posición de la columna
    console.log('Eliminar:', ciudadanoId);

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
            fetch('http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/eliminar/' + ciudadanoId, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    console.log('Ciudadano eliminado con éxito.');
                    // Redirigir después de eliminar con un retraso de 500 milisegundos (0.5 segundos)
                    setTimeout(function() {
                        window.location.href = "/app/ciudadanos";
                    }, 500);
                } else {
                    throw new Error('La solicitud fetch no fue exitosa: ' + response.status);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el ciudadano:', error);
                mostrarMensajeAdvertencia("Elimina primero las tareas de este ciudadano para poder eliminarlo.");
            });
        }, 1000);
    });
});

}


function llenarModal(ciudadanoData) {
    $('#ciudadanoDetails').empty();
    var formContent = '<form id="editarCiudadanoForm">';

    formContent += '<div class="mb-3">';
    formContent += '<label for="nombreCiudadano" class="form-label">Nombre</label>';
    formContent += '<input type="text" class="form-control" id="nombreCiudadano" value="' + ciudadanoData.nombre + '">';
    formContent += '</div>';

    formContent += '<div class="mb-3">';
    formContent += '<label for="edadCiudadano" class="form-label">Edad</label>';
    formContent += '<input type="number" class="form-control" id="edadCiudadano" value="' + ciudadanoData.edad + '">';
    formContent += '</div>';

    formContent += '<div class="mb-3">';
    formContent += '<label for="sexoCiudadano" class="form-label">Sexo</label>';
    formContent += '<input type="text" class="form-control" id="sexoCiudadano" value="' + ciudadanoData.sexo + '">';
    formContent += '</div>';

    // Cerrar el formulario
    formContent += '<button type="submit" class="btn btn-primary">Actualizar</button>';
    formContent += '</form>';

    // Insertar el formulario en el div dentro del modal
    $('#ciudadanoDetails').html(formContent);

    // Agregar evento submit al formulario
    $('#editarCiudadanoForm').on('submit', function (event) {
        event.preventDefault();
        // Lógica para enviar el formulario a la API de actualización
        actualizarCiudadano(ciudadanoData.id);
    });
}
// Función para enviar los datos actualizados a la API
function actualizarCiudadano(ciudadanoId) {
    // Obtener los valores actualizados desde los inputs
    var nombreActualizado = $('#nombreCiudadano').val();
    var edadActualizada = $('#edadCiudadano').val();
    var sexoActualizada = $('#sexoCiudadano').val();
    // Crear un objeto con los datos actualizados
    var datosActualizados = {
        id: ciudadanoId,
        nombre: nombreActualizado,
        edad: edadActualizada,
        sexo: sexoActualizada
    };

    fetch('http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/actualizar/' + ciudadanoId, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(datosActualizados)
    })
        .then(response => {
            if (response.status === 204) {

                console.log('Ciudadano actualizado con éxito.');
                window.location.href = "/app/ciudadanos";
                return;
            }

        })
        .then(data => {

            console.log('Ciudadano actualizado con éxito:', data);
        })
        .catch(error => {

            console.error('Error al actualizar el ciudadano:', error);
        });
}
function mostrarMensajeAdvertencia(mensaje) {
    // Setear el mensaje en el modal
    document.getElementById("mensajeAdvertencia").innerText = mensaje;

    // Mostrar el modal
    var modal = new bootstrap.Modal(document.getElementById('modalAdvertencia'));
    modal.show();
}
var tabla;
function constTablaDias(data) {
    tabla = $("#diasSemana").DataTable({
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
            [5, 10, -1],
            [5, 10, "Todas"],
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
        columns: [
            {
                data: null,
                className: "center bolding",
                title: "LUNES",
            },
            {
                data: null,
                className: "center bolding",
                title: "MARTES",
            },
            {
                data: null,
                className: "center bolding",
                title: "MIERCOLES",
            },
            {
                data: null,
                className: "center bolding",
                title: "JUEVES",
            },
            {
                data: null,
                className: "center bolding",
                title: "VIERNES",
            },
            {
                data: null,
                className: "center bolding",
                title: "SABADO",
            },
            {
                data: null,
                className: "center bolding",
                title: "DOMINGO",
            },
        ],
    });
}