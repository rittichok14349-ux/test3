require('dotenv').config();
const express = require('express');
const cors = require('cors');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const memberRoutes = require('./routes/member.routes');
//const errorMiddleware = require('./middlewares/error.middleware');//
const authRoutes = require('./routes/auth.routes');
const roomsRoutes = require('./routes/rooms.routes');
const studentsRoutes = require('./routes/students.routes');


const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS configuration
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:3000'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

// Routes
app.use('/auth', authRoutes);
app.use('/members', memberRoutes);
app.use('/rooms',roomsRoutes);
app.use('/students',studentsRoutes);

app.get('/', (req, res) => {
  res.json({
    message: 'Member Management API',
    version: '1.0.0',
    endpoints: {
      documentation: `http://localhost:${PORT}/api-docs`,
      members: `http://localhost:${PORT}/members`,
      rooms: `http://localhost:${PORT}/rooms`,
      students: `http://localhost:${PORT}/students`
    }
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: 'ไม่พบเส้นทาง API ที่ร้องขอ'
  });
});

// Start server
app.listen(PORT, () => {
  console.log('='.repeat(50));
  console.log(`🚀 Server: http://localhost:${PORT}`);
  console.log(`📚 API Docs: http://localhost:${PORT}/api-docs`);
  console.log(`👥 Members API: http://localhost:${PORT}/members`);
console.log(`🏠 Rooms API: http://localhost:${PORT}/rooms`);
console.log(`🎓 Students API: http://localhost:${PORT}/students`);

  console.log('='.repeat(50));
});