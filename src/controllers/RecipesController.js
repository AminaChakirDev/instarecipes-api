const { Recipe } = require("../models/Recipe");

module.exports = {

    getAll: async (req, res) => {
        res.json({ result: await Recipe.find() });
    },

    update: async (req, res) => {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true});
        if (updatedRecipe === null) {
            throw 'not found';
        }
        res.json({ result: updatedRecipe });
    },

    delete: async (req, res) => {
            await Recipe.deleteOne({_id: req.params.recipeId });
            res.json({ success: true });
    },

    create: async (req, res) => {
        await Recipe.init();
        const newRecipe = new Recipe(req.body);
        res.json({ success: true, result: await newRecipe.save() });
    }
};