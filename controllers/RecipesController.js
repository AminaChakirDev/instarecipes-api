const { Recipe } = require("../models/Recipe");

module.exports = {

    getAll: async (req, res, next) => {
        try {
            res.json({ result: await Recipe.find() });
        } catch (err) {
            next(err);
        }
    },

    update: async (req, res, next) => {
        try {
            const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true});
            if (updatedRecipe === null) {
                throw 'not found';
            }
            res.json({ result: updatedRecipe });
        }
        catch (err) {
            next(err);
        }
    },

    delete: async (req, res, next) => {
        try {
            await Recipe.deleteOne({_id: req.params.recipeId });
            res.json({ success: true });
        } catch (err) {
            next(err);
        }
    },

    create: async (req, res, next) => {
        try {
            await Recipe.init();
            const newRecipe = new Recipe(req.body);
            res.json({ success: true, result: await newRecipe.save() });
        } 
        catch (err) {
            next(err);
        }
    }
};