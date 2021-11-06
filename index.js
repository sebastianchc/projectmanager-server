const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const app = express();
const port = process.env.port || 4000;

connectDB();

app.use(cors());
app.use(express.json({ extended: true }));

app.use('/api/users', require('./routes/users'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/projects', require('./routes/projects'));
app.use('/api/tasks', require('./routes/tasks'));

app.listen(port, '0.0.0.0', () => {
  console.log(`Server is Working on port ${PORT}`);
});
