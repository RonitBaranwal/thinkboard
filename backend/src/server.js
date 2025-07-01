import express from 'express';
import notesRoutes from './routes/notesRoutes.js';
import { connectDB } from './config/db.js';
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js';
import cors from 'cors';

dotenv.config();
const app = express(); 
app.use(cors({
    origin:"http://localhost:5173",
}));
const PORT=process.env.PORT || 5000;
connectDB();
app.use(express.json());
app.use(rateLimiter)
app.use("/api/notes",notesRoutes);
app.listen(5000, () => console.log(`Server running in port ${PORT}`)); 
