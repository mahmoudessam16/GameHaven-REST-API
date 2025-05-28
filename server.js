import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.config.js';

const app = express();

const PORT = process.env.PORT || 3000;
connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    })
);
