require('dotenv').config({
	path: 'config/.env'
});
const app = require('./app');
const db = require('./db/db');

db.connectDatabase();

const server = app.listen(process.env.PORT, () => {
	console.log(`Server running at port: ${process.env.PORT}`);
});

// If any unhandled exceptions then we will shut down the server
process.on('unhandledRejection', (err) => {
	console.log(`Shutting down the server for ${err.message}`);
	console.log(`Shutting doen the server for unhandle promise rejection`);

	server.close(() => {
		process.exit(1);
	});
});
