var tareaAsignada;
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

document.getElementById('ciudadanoForm').addEventListener('submit', function (event) {
    event.preventDefault();
    var sexo = 'No especificado';
    var nombre = document.getElementById('nombreCiudadano').value;
    var edad = document.getElementById('edadCiudadano').value;
    var sexo = document.getElementById('selectSexo').value;


    // Realiza la validación y asignación
    if (sexo === '1') {
        sexo = 'MASCULINO';
    } else if (sexo === '2') {
        sexo = 'FEMENINO';
    }
    // Validar si la variable tarea asignada tiene algo seleccionado o asignado
    if (tareaAsignada !== null && tareaAsignada !== undefined) {

        console.log('Tarea seleccionada:', tareaAsignada);
        var data = {
            "nombre": nombre, // Asigna la variable nombre
            "edad": edad, // Asigna la variable edad
            "sexo": sexo, // Asigna la variable sexo
            "idTareas": [tareaAsignada] // Crea un array con el valor de tareaAsignada
        };
        guardarCiudadano(data);
    } else {

        var data = {
            nombre: nombre,
            edad: edad,
            sexo: sexo
        };
        guardarCiudadano(data);
    }

});


function guardarCiudadano(data) {
    fetch('http://69.164.193.25:8080/mcsvs/api/v1/ciudadanos/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de la API:', data);

            window.location.href = "/app/ciudadanos";

        })
        .catch(error => {
            console.error('Error al enviar datos a la API:', error);
        });
}