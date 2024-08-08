import express from 'express';
import path from 'path';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';
import cors from 'cors'

const app = express();

app.use(express.json()); 
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Allow requests from specific origin (http://localhost:4200)
app.use(cors({
  origin: 'http://localhost:4200',
  methods: 'GET,POST,PUT,DELETE,PATCH',
  allowedHeaders: 'Content-Type,Authorization'
}));

app.use('/auth', authRoutes);

//function call for DB connection
const startServer = async () => {
  await connectDB();
  
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
};

startServer();
