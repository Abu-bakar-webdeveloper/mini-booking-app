import app from './src/app.js';
import http from 'http';
import connectDB from './src/config/db.js';
import dotenv from 'dotenv';

dotenv.config();

const server = http.createServer(app);
const PORT = process.env.PORT || 5000;

// Connect to database
connectDB();

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});