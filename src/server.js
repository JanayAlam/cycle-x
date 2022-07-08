require('dotenv').config();
const http = require('http');
const app = require('./api/app');
const connectDB = require('./api/db');

const server = http.createServer(app);

const main = async () => {
    try {
        // database connection URI
        const DB_URI = process.env.DB_URI;
        const DB_NAME = process.env.DB_NAME;
        if (!DB_URI || !DB_NAME) {
            throw new Error(
                'Database connection URI and database name required'
            );
        }
        // concatenation of the database uri and name
        const URI = DB_URI+DB_NAME;
        // connecting to the database with mongoose
        await connectDB(URI);
        console.log('Database connected. Server will be running soon...');
        // defining the port number
        const PORT = process.env.SERVER_PORT || 5000;
        // running the server
        await server.listen(PORT);
        console.log(`Server is listening to port ${PORT}`);
    } catch (err) {
        console.log(err.message ? err.message : 'Server error occurred');
        throw err;
    }
};

// running the app
main();
