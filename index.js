const path = require('path');
const express = require("express");
const app = express();
const SocketIO = require('socket.io');

//settings
app.set('port', process.env.PORT || 3000);

//static
app.use(express.static(path.join(__dirname, 'public')));

// start server
const server = app.listen(app.get('port'), () => {
    console.log('server on port', app.get('port'));
});
const io = SocketIO(server);

// websockets
io.on('connection', (socket) => {
    console.log('new connection', socket.id);

    socket.on('chat:message', (data) => {
        io.sockets.emit('chat:message', data);
    });

    socket.on('chat:typing', (data) => {
        socket.broadcast.emit('chat:typing', data)
    })


});




