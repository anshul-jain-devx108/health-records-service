const express = require('express');
const app = express();
const connectDB = require('./config/db');
const healthRecordRoutes = require('./routes/healthRecordRoutes');

connectDB();

app.use(express.json());
app.use('/api/health-records', healthRecordRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
