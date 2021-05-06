const { Recipe } = require("../models/Recipe");
import {Request, Response} from "express";

export = {

    getAll: async (req: Request, res: Response): Promise<void> => {
        res.json({ result: await Recipe.find() });
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const updatedRecipe = await Recipe.findByIdAndUpdate(req.params.recipeId, req.body, {new: true});
        if (updatedRecipe === null) {
            throw 'not found';
        }
        res.json({ result: updatedRecipe });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
            await Recipe.deleteOne({_id: req.params.recipeId });
            res.json({ success: true });
    },

    create: async (req: Request, res: Response): Promise<void> => {
        await Recipe.init();
        const newRecipe = new Recipe(req.body);
        res.json({ success: true, result: await newRecipe.save() });
    }
};