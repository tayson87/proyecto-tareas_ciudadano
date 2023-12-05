var tareaAsignada;
var selectTareas = document.getElementById('selectTareas');


document.getElementById('tareaForm').addEventListener('submit', function (event) {
    event.preventDefault();

    var tareaNombre = document.getElementById('tareaNombre').value;
    var diaSemana = document.getElementById('diaSemana').value;

    var data = {
        tarea: tareaNombre,
        diaTarea: diaSemana
    };
    guardarTarea(data);

});

function guardarTarea(data) {
    fetch('http://69.164.193.25:8080/mcsvs/api/v1/tareas/crear', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Respuesta de la API:', data);

            window.location.href = "/app/tareas/tablero";

        })
        .catch(error => {
            console.error('Error al enviar datos a la API:', error);
        });
}