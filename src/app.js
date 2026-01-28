import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import passport from "passport";
import routes from './routes/index.js';
import { initPassport } from './config/passport.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
initPassport();
app.use(passport.initialize());

app.use('/api', routes);

export default app;