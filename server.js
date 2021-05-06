const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const RecipesController = require('./controllers/RecipesController');

mongoose
    .connect("mongodb://127.0.0.1:27017/instarecipesdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
        useFindAndModify: false,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => console.error('Mongoose failed'));

const app = express();

app.use(bodyParser.json());

const asyncHandler = (controller) => {
    return async (req, res, next) => {
        try {
            await controller(req, res);
        }
        catch({ code, message, status }) {
            res
                .status(status || 500)
                .json({
                    code,
                    message
                });
        }
    }
}

app.get('/api/recipes', asyncHandler(RecipesController.getAll));
app.post('/api/recipes', asyncHandler(RecipesController.create));
app.put('/api/recipes/:recipeId', asyncHandler(RecipesController.update));
app.delete('/api/recipes/:recipeId', asyncHandler(RecipesController.delete));

app.use('*', (req, res) => {
    res.status(404).json({ error: "not found" });
});

app.listen(3000, ()  => console.log('App is running'));