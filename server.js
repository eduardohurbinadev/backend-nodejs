import 'dotenv/config'
import express from 'express';
import mongoose from 'mongoose';
import User from './models/User.js';

const app = express();

mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get('/', async (req, res) => {
    res.send('Hello there');

})

app.post('/users', async (req, res) => {
  const { email, name, age } = req.body;
  
  try {
    const user = await User.create({ email, name, age });
    res.status(200).json({ message: 'User created successfully', data: user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

