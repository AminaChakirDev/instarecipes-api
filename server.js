const express = require('express');
const mongoose = require('mongoose');
const { Recipe } = require('./models/Recipe');
const app = express();

mongoose
    .connect("mongodb://127.0.0.1:27017/instarecipesdb", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
    })
    .then(() => {
        console.log("Connected to database");
    })
    .catch((err) => console.log(err));

app.get("/createrecipe", (req, res) => {

    Recipe
        .init()
        .then(() => {
            const newRecipe = new Recipe({
                title: "Tarte aux pommes",
                instagramUrl: "www.yahoo.fr",
                instagramAuthor: "karimaelmakhloufi",
                ingredients: [
                    { title: "Pommes", icon: "https://media.gerbeaud.net/2017/01/640/pomme-detouree.jpg" },
                    { title: "Beurre", icon: "https://parlonssciences.ca/sites/default/files/styles/large/public/2019-08/can-we-make-butter.jpg?itok=-SJ76yVA" },
                ]
            });
        
            newRecipe
                .save()
                .then(() => {
                    console.log('Recipe saved');
                    res.json({ success: true });
                })
                .catch(() => {
                    console.error('Recipe not saved');
                    res.json({ success: false });
        
                });
            });
        
        });

app.listen(3000, ()  => console.log("Server started on 3000"));