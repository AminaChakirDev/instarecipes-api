import 'reflect-metadata';
import express from 'express';
import { Request, Response } from 'express';
import mongoose from 'mongoose';
import asyncHandler from 'express-async-handler';
import bodyParser from 'body-parser';
import cors from 'cors';
const RecipesController = require('./controllers/RecipesController');

mongoose
    .connect('mongodb://127.0.0.1:27017/instarecipesdb', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => console.error('Mongoose failed'));

const app = express();

app.use(bodyParser.json());

app.use(cors());

/* const asyncErrorHandler = (controller) => {
    return async (req, res) => {
        try {
            await controller(req, res);
        } catch ({ code, message, status }) {
            res
                .status(status || 500)
                .json({
                    code,
                    message
                });
        }
    };
};
*/

app.get('/', (req, res) => {
    res.send('Hello World');
});

app.get('/api/recipes', asyncHandler(RecipesController.getAll));
app.post('/api/recipes', asyncHandler(RecipesController.create));
app.put('/api/recipes/:recipeId', asyncHandler(RecipesController.update));
app.delete('/api/recipes/:recipeId', asyncHandler(RecipesController.delete));

app.use('*', (req: Request, res: Response) => {
    res.status(404).json({ error: 'not found' });
});

app.listen(3000, () => console.log('App is running'));
