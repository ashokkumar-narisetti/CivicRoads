import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';

import citizenRoutes from './routes/citizen.routes';
import officerRoutes from './routes/officer.routes';
import { errorHandler } from './middlewares/error.middleware';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', timestamp: new Date() });
});

// Routes
app.use('/api/citizen', citizenRoutes);
app.use('/api/officer', officerRoutes);
// Admin routes would go here

// Error Handling (Must be last)
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`API Server running on port ${PORT}`);
});
