//Comando para establecer la comunicacion
var socket = io();
var label = $('#lblNuevoTicket');

//Conexion con el servidor
socket.on('connect', function() {
    console.log('Conectado con el servidor');
});

//Desconectado del servidor
socket.on('disconnect', function() {
    console.log('Desconectado del servidor');
});

//Creo un listener al boton
$('button').on('click', function() {
    //Envio informacion al servidor
    socket.emit('siguienteTicket', null, function(siguienteTicket) {
        label.text(siguienteTicket);
    });
});

socket.on('estadoActual', function(resp) {
    label.text(resp.actual);
});