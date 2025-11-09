import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

// Import API functions
import { GET, GET_BY_ID, POST, PUT, DELETE } from './api/recipes.js';
import { GET as GET_PLANS, GET_BY_ID as GET_PLAN_BY_ID, POST as POST_PLANS, PUT as PUT_PLANS, DELETE as DELETE_PLANS } from './api/plans.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Security middleware
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use('/api/', limiter);

// CORS configuration
app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  credentials: true
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    type: 'Serverless API'
  });
});

// Recipe endpoints
app.get('/api/recipes', GET);
app.get('/api/recipes/:id', GET_BY_ID);
app.post('/api/recipes', POST);
app.put('/api/recipes/:id', PUT);
app.delete('/api/recipes/:id', DELETE);

// Weekly plan endpoints
app.get('/api/plans', GET_PLANS);
app.get('/api/plans/:id', GET_PLAN_BY_ID);
app.post('/api/plans', POST_PLANS);
app.put('/api/plans/:id', PUT_PLANS);
app.delete('/api/plans/:id', DELETE_PLANS);

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'Recipe Planner API (Serverless)',
    version: '1.0.0',
    type: 'Serverless Functions',
    endpoints: {
      health: '/health',
      recipes: '/api/recipes',
      plans: '/api/plans'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error'
  });
});

// Export for serverless deployment
export default app;

// For local development
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Serverless API running on port ${PORT}`);
    console.log(`📝 Environment: ${process.env.NODE_ENV}`);
    console.log(`🔗 Health check: http://localhost:${PORT}/health`);
  });
}
