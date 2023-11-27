import app from './app.js';
import dbConnection from './config/dbConnection.js';
import { config } from 'dotenv';
config({
    path: './env'
});

const PORT = process.env.PORT || 8080;

dbConnection()
    .then(() => {
        app.listen(PORT, () => {
            console.log(`⚙️  Server is running at port : ${PORT}`);
        });
    })
    .catch((Error) => {
        console.log('MONGODB CONNECTION FAILED -> ', Error);
    })