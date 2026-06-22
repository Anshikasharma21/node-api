require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const productRoute = require('./routes/productRoute');
const errorMiddleware = require('./middleware/errorMiddleware');

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL;

// Middleware
app.use(cors({
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ROUTES
app.use('/api/products', productRoute);

// Test Route
app.get('/', (req, res) => {
  res.send('Node API Running');
});

// Error Middleware
app.use(errorMiddleware);

// MongoDB Connection
mongoose.connect(MONGO_URL)
.then(() => {
  console.log('MongoDB Connected');

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

})
.catch((error) => {
  console.log(error);
});