import dotenv from 'dotenv';
dotenv.config();

import app from './app.js';
import { connectDB } from './db.js';

await connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Analytics backend running on ${process.env.PORT}`);
});
