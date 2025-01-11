import express from 'express';
import { router } from './routes/v1';
import cors from 'cors';

const app = express();
app.options('*', cors());
app.use(cors({
    origin: 'http://localhost:3002',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true
}));
app.use(express.json())

app.use("/api/v1", router)

app.listen(process.env.PORT || 3000)