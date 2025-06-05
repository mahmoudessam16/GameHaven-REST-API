import dotenv from 'dotenv';
import express from 'express';
import connectDB from './config/db.config.js';
import authRouter from './routes/authRouter.js';
import auth from './middlewares/authMiddleware.js';
import loggerMiddleware from './middlewares/loggerMiddleware.js';
import isAdmin from './middlewares/roleMiddleWare.js';
import morgan from 'morgan';

dotenv.config();
const app = express();
app.use(morgan('dev')); 
app.use(loggerMiddleware); 
app.use(express.json());

app.use('/auth' ,authRouter);



const PORT = process.env.PORT || 5000;
connectDB().then(
    app.listen(PORT, () => {
        console.log(`Server running on PORT ${PORT}`);
    })
);
