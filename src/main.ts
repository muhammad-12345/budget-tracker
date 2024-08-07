import express from 'express';
import path from 'path';
import { connectDB } from './config/db';
import authRoutes from './routes/authRoutes';

const app = express();

app.use(express.json()); 
app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.use('/api/auth', authRoutes);

//function call for DB connection
const startServer = async () => {
  await connectDB();
  
  const port = process.env.PORT || 3333;
  const server = app.listen(port, () => {
    console.log(`Listening at http://localhost:${port}/api`);
  });

  server.on('error', (err) => {
    console.error('Server error:', err);
  });
};

startServer();
