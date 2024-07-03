const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const connectToDatabase = require('./db');
const userRoutes = require('./userRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 6640;

app.use(bodyParser.json());
app.use(cors());

app.use('/', userRoutes);

async function startServer() {
    try {
        const db = await connectToDatabase();
        app.locals.db = db;
        console.log('Database connected and routes initialized');

        app.listen(port, '0.0.0.0', () => {
            console.log(`Server is running on http://localhost:${port}`);
        });
    } catch (err) {
        console.error('Failed to start server:', err);
    }
}

startServer();
