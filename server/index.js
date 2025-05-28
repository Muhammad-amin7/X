import express from 'express';
import dotenv from 'dotenv';
import passport from 'passport';
import cors from 'cors';
import './src/config/passport.js';
import router from './src/router/router.js';
import { connectToDatabase } from './src/config/connectToDatabase.js';
dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(cors());

connectToDatabase();

app.use(passport.initialize());

app.use('/', router);

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
