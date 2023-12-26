require('dotenv').config({
	path: 'config/.env'
});
const app = require('./app');
const db = require('./db/db');
const configureSocket = require('./socket');
const http = require('http')

db.connectDatabase();

const httpServer = http.createServer(app)

const server = httpServer.listen(process.env.PORT, () => {
	console.log(`Server running at port: ${process.env.PORT}`);
});

configureSocket(httpServer)

// const httpServer = http.createServer(app).listen(process.env.PORT, process.env.HOST, () => {
// 	console.log(`Server running at port: http://${process.env.HOST}:${process.env.PORT}`);
// })

// configureSocket(httpServer)

// If any unhandled exceptions then we will shut down the server
process.on('unhandledRejection', (err) => {
	console.log(`Shutting down the server for ${err.message}`);
	console.log(`Shutting doen the server for unhandle promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});
