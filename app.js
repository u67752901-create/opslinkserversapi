import express from 'express';
import cors from 'cors';
import analyticsRoutes from './routes/analytics.js';

const app = express();

// Allow all origins
app.use(cors({
  origin: '*',           // Allow any origin
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization']
}));

app.use(express.json());
app.use('/analytics', analyticsRoutes);

export default app;
