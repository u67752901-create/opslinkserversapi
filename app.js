import express from 'express';
import cors from 'cors';
import analyticsRoutes from './routes/analytics.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/analytics', analyticsRoutes);

export default app;
