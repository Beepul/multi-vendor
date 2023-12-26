const {Server} = require('socket.io')

const configureSocket = (server) => {
    const io = new Server(server, {
        cors: {
            origin: 'http://localhost:5173'
        }
    })

    io.on('connection', (socket) => {
        console.log('connected')

        socket.on('create-something', (args) => {
            console.log('Created something::', args)
            socket.emit('reply-something', args)
        })
        socket.on('disconnect', (socket) => {
            console.log('disconnected')
        })
    })
}

module.exports = configureSocket