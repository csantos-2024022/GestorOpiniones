import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRoutes from './auth/auth.routes.js';
import opinionRoutes from './opinion/opinion.routes.js';


export const createApp = () => {
    const app = express();

    // Middlewares globales
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan('dev'));
    

    // Rutas
    app.use('/api/auth', authRoutes);
    app.use('/api/opinions', opinionRoutes);


    // Health check
    app.get('/health', (req, res) => {
        res.status(200).json({
            status: 'Healthy',
            timestamp: new Date().toISOString()
        });
    });

    return app;
};