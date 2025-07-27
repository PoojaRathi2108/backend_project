const express = require('express');
const app = express();
const userRoutes = require('./routes/user.routes');
const locationRoutes = require('./routes/location.routes'); // ✅ Import
const path = require('path');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static files for uploaded images
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/api/users', userRoutes);
app.use('/api', locationRoutes); // ✅ Add this line for city/state APIs

// Server Start
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
