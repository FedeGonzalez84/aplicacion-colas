const { io } = require('../server');
const { TicketControl } = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    //Escuchar al cliente
    client.on('siguienteTicket', (data, callback) => {
        let ticketSiguiente = ticketControl.siguiente();
        console.log(ticketSiguiente);

        callback(ticketSiguiente);
    });

    //Emitir un evento 'estadoActual'
    client.emit('estadoActual', {
        actual: ticketControl.getUltimoTicket(),
        ultimos4: ticketControl.getUltimos4()
    });

    //Atender ticket
    client.on('atenderTicket', (data, callback) => {
        if (!data.escritorio) {
            callback({
                err: true,
                mensaje: 'El escritorio es necesario'
            });
        };
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);

        //Emitir ultimos 4 mediante un broadcast
        client.broadcast.emit('ultimos4', {
                ultimos4: ticketControl.getUltimos4()
            }

        );

    });
});