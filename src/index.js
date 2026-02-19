require('dotenv').config();
const express = require('express');
const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerFile = require('../swagger-output.json');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const PORT = process.env.PORT || 3000;
const authRoutes = require('./routes/auth.routes');
const memberRoutes = require('./routes/member.routes');
const roomsRoutes = require('./routes/rooms.routes');
const studentsRoutes = require('./routes/students.routes');
const userRoutes = require('./routes/user.routes');

// static folder uploads
app.use("/uploads", express.static("uploads"));
app.use('/images', express.static(path.join(__dirname, '../images')));

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use('/students', studentsRoutes); // ✅ แก้ตรงนี้
app.use('/auth', authRoutes);
app.use('/members', memberRoutes);
app.use('/rooms', roomsRoutes);

app.use('/users', userRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to the Room Booking API",
    docs: "/api-docs"
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
