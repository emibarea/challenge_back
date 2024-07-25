const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require('./routes/authRoutes');
const userRoutes = require('./routes/userRoutes');
const facturasRoutes = require('./routes/facturasRoutes');
require("dotenv").config();

const app = express();
const port = process.env.PORT || 8081;

app.use(express.json());

const allowedOrigins = ["http://localhost:5173"];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));

mongoose.connect(process.env.MONGO_URI);

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/facturas', facturasRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
