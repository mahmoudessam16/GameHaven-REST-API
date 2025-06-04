import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import connectDB from './config/db.config.js';
import authRouter from './routes/auth.router.js';
import auth from './middlewares/authMiddleware.js';
import loggerMiddleware from './middlewares/logger.middleware.js';
import isAdmin from './middlewares/roleMiddleWare.js';
import morgan from 'morgan';

const app = express();
app.use(morgan('dev')); 
app.use(loggerMiddleware); 
app.use(express.json());

app.use('/api/auth', authRouter);
const PORT = process.env.PORT || 5000;
connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    })
);
