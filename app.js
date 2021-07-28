const app = require('express')();
const server = require('http').createServer(app);
const cors = require('cors');

const io = require('socket.io')(server, {
    cors: {
    origin: "*",
    methods: ["GET", "POST"]
    }
});

const corsOption = {
    origin: '*',
    methods: 'GET,OPTION,PUT,DELETE,POST',
}

app.get('/', cors(corsOption), (req,res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', socket => {
    socket.on('login', data => {
        console.log('Client logged-in:\n name:' + data.name + '\n userid: ' + data.userid);

        socket.name = data.name;
        socket.userid = data.userid;

        io.emit('login', data.name);
    });

    socket.on('chat', data => {
        console.log('Message from %s: %s', socket.name, data.msg);

        const msg = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        };
        io.emit('s2c chat', msg);
        // socket.broadcast.emit('chat', msg);
    });

    socket.on('typing', data => {
        console.log(socket.name, data.msg);

        const log = {
            from: {
                name: socket.name,
                userid: socket.userid
            },
            msg: data.msg
        };
        io.emit('typing', log);
    })
    socket.on('forceDisconnect', () => {
        socket.disconnet();
    });

    socket.on('disconnect', () => {
        console.log('Socket IO server listening on port 3000');
    });
});

server.listen(8000, () => {
    console.log('Socket IO listening on port 8000');
});
