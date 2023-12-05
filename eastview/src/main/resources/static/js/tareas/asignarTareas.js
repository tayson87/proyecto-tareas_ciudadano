var valoresSeleccionados = [];
var ciudadanosSeleccionados = [];
// Array para almacenar las relaciones entre ciudadanos y tareas
var listaCiudadanosTareas = [];
$(document).ready(function () {
    crearTareasSelect();
    crearCiudadanosSelect();
    var selectTareas = document.getElementById('selectTareas');
    // Obtén el elemento ul donde mostrar las opciones seleccionadas
    var ulOpcionesSeleccionadas = document.getElementById('opcionesSeleccionadas');
    // Agregar evento de cambio al select
    selectTareas.addEventListener('change', function () {
        // Obtener opciones seleccionadas
        var opcionesSeleccionadas = Array.from(selectTareas.selectedOptions).map(option => option.text);

        // Agregar nuevas opciones al array de valores seleccionados
        valoresSeleccionados = [...new Set([...valoresSeleccionados, ...opcionesSeleccionadas])];

        // Actualizar la lista en el HTML
        actualizarLista();
    });

    // Función para eliminar una tarea del array y actualizar la lista
    function eliminarTarea(event) {
        var index = event.target.dataset.index;

        // Eliminar la tarea del array
        valoresSeleccionados.splice(index, 1);

        // Actualizar la lista en el HTML
        actualizarLista();
    }

    // Función para actualizar la lista en el HTML
    function actualizarLista() {
        // Limpiar el contenido del ul
        ulOpcionesSeleccionadas.innerHTML = '';

        // Recorrer el array de valores seleccionados y agregar elementos li al ul
        valoresSeleccionados.forEach(function (valor, index) {
            var li = document.createElement('li');
            li.className = 'list-group-item';

            // Agregar el texto de la tarea
            li.textContent = valor;

            // Agregar el botón "Eliminar"
            var botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.className = 'btn btn-danger btn-sm float-end';
            botonEliminar.dataset.index = index; // Asignar el índice como un atributo de datos
            botonEliminar.addEventListener('click', eliminarTarea);
            li.appendChild(botonEliminar);

            // Agregar el elemento li al ul
            ulOpcionesSeleccionadas.appendChild(li);
        });

        // Mostrar los valores seleccionados (puedes hacer lo que quieras con este array)
        console.log("Valores seleccionados:", valoresSeleccionados);
    }

    ///*************************************************************** */
    // Array para almacenar los valores seleccionados de ciudadanos
    var ciudadanosSeleccionados = [];

    // Obtén el elemento ul donde mostrar las opciones seleccionadas de ciudadanos
    var ulCiudadanosSeleccionados = document.getElementById('ciudadanosSeleccionados');

    // Obtén el elemento select de ciudadanos
    var selectCiudadanos = document.getElementById('selectCiudadanos');

    // Agregar evento de cambio al select de ciudadanos
    selectCiudadanos.addEventListener('change', function () {
        // Obtener opciones seleccionadas de ciudadanos
        var opcionesCiudadanosSeleccionadas = Array.from(selectCiudadanos.selectedOptions).map(option => option.text);

        // Agregar nuevas opciones al array de ciudadanos seleccionados
        ciudadanosSeleccionados = [...new Set([...ciudadanosSeleccionados, ...opcionesCiudadanosSeleccionadas])];

        // Actualizar la lista de ciudadanos seleccionados en el HTML
        actualizarListaCiudadanos();
    });

    // Función para eliminar un ciudadano del array y actualizar la lista
    function eliminarCiudadano(event) {
        var index = event.target.dataset.index;

        // Eliminar el ciudadano del array
        ciudadanosSeleccionados.splice(index, 1);

        // Actualizar la lista de ciudadanos seleccionados en el HTML
        actualizarListaCiudadanos();
    }

    // Función para actualizar la lista de ciudadanos seleccionados en el HTML
    function actualizarListaCiudadanos() {
        // Limpiar el contenido del ul de ciudadanos seleccionados
        ulCiudadanosSeleccionados.innerHTML = '';

        // Recorrer el array de ciudadanos seleccionados y agregar elementos li al ul
        ciudadanosSeleccionados.forEach(function (ciudadano, index) {
            var li = document.createElement('li');
            li.className = 'list-group-item';

            // Agregar el texto del ciudadano
            li.textContent = ciudadano;

            // Agregar el botón "Eliminar"
            var botonEliminar = document.createElement('button');
            botonEliminar.textContent = 'Eliminar';
            botonEliminar.className = 'btn btn-danger btn-sm float-end';
            botonEliminar.dataset.index = index; // Asignar el índice como un atributo de datos
            botonEliminar.addEventListener('click', eliminarCiudadano);
            li.appendChild(botonEliminar);

            // Agregar el elemento li al ul de ciudadanos seleccionados
            ulCiudadanosSeleccionados.appendChild(li);
        });

        // Mostrar los valores seleccionados de ciudadanos (puedes hacer lo que quieras con este array)
        console.log("Ciudadanos seleccionados:", ciudadanosSeleccionados);
    }


    // Función para agregar una relación al array
    function agregarRelacion(idCiudadano, idTarea) {
        listaCiudadanosTareas.push({
            "idCiudadano": idCiudadano,
            "idTarea": idTarea
        });
    }

    // Evento de cambio para el select de ciudadanos
    selectCiudadanos.addEventListener('change', function () {
        var opcionesCiudadanosSeleccionadas = Array.from(selectCiudadanos.selectedOptions).map(option => option.value);

        // Obtener las tareas seleccionadas
        var opcionesTareasSeleccionadas = Array.from(selectTareas.selectedOptions).map(option => option.value);

        // Agregar relaciones al array
        opcionesCiudadanosSeleccionadas.forEach(function (idCiudadano) {
            opcionesTareasSeleccionadas.forEach(function (idTarea) {
                agregarRelacion(idCiudadano, idTarea);
            });
        });

        // Mostrar la estructura actual del array de relaciones
        console.log("Relaciones actuales:", listaCiudadanosTareas);
    });
    
    // Evento de cambio para el select de ciudadanos
    selectCiudadanos.addEventListener('change', function () {
        var opcionesCiudadanosSeleccionadas = Array.from(selectCiudadanos.selectedOptions).map(option => option.value);

        // Obtener las tareas seleccionadas
        var opcionesTareasSeleccionadas = Array.from(selectTareas.selectedOptions).map(option => option.value);

        // Agregar relaciones al array
        opcionesCiudadanosSeleccionadas.forEach(function (idCiudadano) {
            opcionesTareasSeleccionadas.forEach(function (idTarea) {
                agregarRelacion(idCiudadano, idTarea);
            });
        });

        // Mostrar la estructura actual del array de relaciones
        console.log("Relaciones actuales:", listaCiudadanosTareas);
    });

});
// Función para eliminar una tarea del array y actualizar la lista
function eliminarTarea(event) {
    var index = event.target.dataset.index;

    // Eliminar la tarea del array
    valoresSeleccionados.splice(index, 1);

    // Actualizar la lista en el HTML
    actualizarLista();
}

// Función para actualizar la lista en el HTML
function actualizarLista() {
    // Limpiar el contenido del ul
    ulOpcionesSeleccionadas.innerHTML = '';

    // Recorrer el array de valores seleccionados y agregar elementos li al ul
    valoresSeleccionados.forEach(function (valor, index) {
        var li = document.createElement('li');
        li.className = 'list-group-item';

        // Agregar el texto de la tarea
        li.textContent = valor;

        // Agregar el botón "Eliminar"
        var botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.className = 'btn btn-danger btn-sm float-end';
        botonEliminar.dataset.index = index; // Asignar el índice como un atributo de datos
        botonEliminar.addEventListener('click', eliminarTarea);
        li.appendChild(botonEliminar);

        // Agregar el elemento li al ul
        ulOpcionesSeleccionadas.appendChild(li);
    });

    // Mostrar los valores seleccionados (puedes hacer lo que quieras con este array)
    console.log("Valores seleccionados:", valoresSeleccionados);
}
function crearTareasSelect() {
    var selectTareas = document.getElementById('selectTareas');
    fetch('http://69.164.193.25:8080/mcsvs/api/v1/tareas/listar')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(tarea => {

                var option = document.createElement('option');
                option.value = tarea.idTarea; // Asigna el valor de la tarea (ajusta según la estructura de tu tarea)
                option.textContent = tarea.tarea; // Asigna el texto de la tarea (ajusta según la estructura de tu tarea)
                selectTareas.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar tareas desde la API:', error);
        });

    selectTareas.addEventListener('change', function () {
        if (selectTareas.value !== 'Lista de Tareas') {

            tareaAsignada = selectTareas.value;
            console.log('Valor seleccionado:', selectTareas.value);

        }
    });
}

function crearCiudadanosSelect() {
    var selectTareas = document.getElementById('selectCiudadanos');
    fetch('http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/listar')
        .then(response => response.json())
        .then(data => {
            console.log(data);
            data.forEach(ciudadano => {

                var option = document.createElement('option');
                option.value = ciudadano.id; // Asigna el valor de la tarea (ajusta según la estructura de tu tarea)
                option.textContent = ciudadano.nombre; // Asigna el texto de la tarea (ajusta según la estructura de tu tarea)
                selectTareas.appendChild(option);
            });
        })
        .catch(error => {
            console.error('Error al cargar tareas desde la API:', error);
        });

    selectTareas.addEventListener('change', function () {
        if (selectTareas.value !== 'Lista de Tareas') {

            tareaAsignada = selectTareas.value;
            console.log('Valor seleccionado:', selectTareas.value);

        }
    });
}

// Función para enviar la estructura al servidor
function enviarRelacionesAlServidor() {
    // Estructura a enviar
    var estructuraEnviar = {
        "listaCiudadanosTareas": listaCiudadanosTareas
    };

   var json =  JSON.stringify(estructuraEnviar)
   console.log(json);
    // Configuración de la solicitud
    var requestOptions = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
            // Puedes incluir otros encabezados según sea necesario
        },
        body: JSON.stringify(estructuraEnviar)
    };

    // URL de la API (debes reemplazarla con tu propia URL)
    var apiUrl = 'http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/ciudadanos-tareas';

    // Realizar la solicitud
    fetch(apiUrl, requestOptions)
    .then(response => {
        if (!response.ok) {
            throw new Error('La solicitud no fue exitosa: ' + response.statusText);
        }
        return response.text(); // Obtener el cuerpo de la respuesta como texto
    })
    .then(data => {
        console.log('Contenido de la respuesta:', data);
        // Intentar analizar la respuesta como JSON si hay contenido
        if (data.trim() !== "") {
            const jsonData = JSON.parse(data);
            console.log('Respuesta del servidor:', jsonData);
            // Resto del código
        } else {
            console.log('La respuesta del servidor está vacía.');
            // Puedes manejar esto según tus necesidades
        }
        window.location.href = "/app/tareas/tablero";
    })
    .catch(error => {
        console.error('Error al realizar la solicitud:', error);
        // Resto del código
    });
 
}

