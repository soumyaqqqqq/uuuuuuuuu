import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/mongo.js';
import { runPrediction, getPlaces } from './controllers/predict.js';
import { signup, login } from './controllers/User.js';
import cors from 'cors'; // <-- New: Import the cors package

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// <-- New: Configure and use the cors middleware
app.use(cors({
  origin: 'http://localhost:5173' 
}));

app.use(express.json());

connectDB();

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.get('/predict', async (req, res) => {
  await runPrediction();
  res.send("Prediction and alert process completed.");
});

app.get('/places', getPlaces);

app.post('/signup', signup);
app.post('/login', login);

setInterval(async () => {
  try {
    await runPrediction();
    console.log("✅ Prediction run completed.");
  } catch (err) {
    console.error("❌ Prediction run failed:", err);
  }
}, 50000); 

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});