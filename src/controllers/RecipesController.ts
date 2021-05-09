import { RecipeModel } from '../models/Recipe';
import { plainToClass, Type } from 'class-transformer';
import { Request, Response } from 'express';
import { IsString, ValidateNested, validateOrReject } from 'class-validator';

class Ingredient {
    @IsString()
    title!: string;

    @IsString()
    icon!: string;
}

class Recipe {
    @IsString()
    title!: string;

    @IsString()
    instagramUrl!: string;

    @IsString()
    instagramAuthor!: string;

    @Type(() => Ingredient)
    @ValidateNested({ each: true })
    ingredients!: Ingredient[];
}

export = {

    getAll: async (req: Request, res: Response): Promise<void> => {
        res.json({ success: true, result: await RecipeModel.find() });
    },

    update: async (req: Request, res: Response): Promise<void> => {
        const recipeObject = plainToClass(Recipe, req.body);
        await validateOrReject(recipeObject);

        const updatedRecipe = await RecipeModel.findByIdAndUpdate(req.params.recipeId, req.body, { new: true });
        if (updatedRecipe === null) {
            throw new Error('not found');
        }
        res.json({ result: updatedRecipe });
    },

    delete: async (req: Request, res: Response): Promise<void> => {
        const deleteRecipe = await RecipeModel.deleteOne({ _id: req.body._id }, req.body);
        res.json({ result: deleteRecipe });
    },

    create: async (req: Request, res: Response): Promise<void> => {
        const recipeObject = plainToClass(Recipe, req.body);
        await validateOrReject(recipeObject);

        await RecipeModel.init();
        const newRecipe = new RecipeModel(recipeObject);
        res.json({ success: true, result: await newRecipe.save() });
    },
};
