import { RecipeType } from "../entities/RecipeType";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getModelForClass} from "@typegoose/typegoose";
import {RecipeInput} from "../entities/RecipeInput";
import {IngredientType} from "../entities/IngredientType";
import {AccessoryType} from "../entities/AccessoryType";

@Resolver(() => RecipeType)
export class RecipesResolver {

    @Query(() => [RecipeType])
    public async getRecipes(): Promise<RecipeType[]> {
        const RecipeModel = getModelForClass(RecipeType);
        const ingredientModel = getModelForClass(IngredientType);
        const accessoryModel = getModelForClass(AccessoryType);
        return RecipeModel.find().populate("ingredients", undefined, ingredientModel).populate("accessories", undefined, accessoryModel).exec();
    }

    @Query(() => RecipeType, {nullable: true})
    public async getRecipeByName(@Arg('title') title: string): Promise <RecipeType> {
        const RecipeModel = getModelForClass(RecipeType);
        const ingredientModel = getModelForClass(IngredientType);
        const accessoryModel = getModelForClass(AccessoryType);
        return RecipeModel.findOne({ title }).populate("ingredients", undefined, ingredientModel).populate("accessories", undefined, accessoryModel).exec();
    }

    @Query(() => RecipeType, {nullable: true})
    public async getRecipeById(@Arg('title') title: string): Promise <RecipeType> {
        const RecipeModel = getModelForClass(RecipeType);
        return RecipeModel.findOne({ title }).exec();
    }

    @Mutation(() => RecipeType, {nullable: true})
    public async createRecipe(@Arg('data', () => RecipeInput) data: RecipeInput): Promise<RecipeType> {
        const RecipeModel = getModelForClass(RecipeInput);
        return  RecipeModel.create(data);
    }

    @Mutation(() => Boolean)
    public async deleteRecipe(@Arg('title') title: string): Promise<Boolean> {
        const RecipeModel = getModelForClass(RecipeType);
        await RecipeModel.deleteOne({ title }).exec();
        return true;
    }

    @Mutation(() => RecipeType, {nullable: true})
    public async updateRecipe(@Arg('title') title: string, @Arg('data', () => RecipeInput) data: RecipeType): Promise<RecipeType> {
        const RecipeModel = getModelForClass(RecipeInput);
        const ingredientModel = getModelForClass(IngredientType);
        const accessoryModel = getModelForClass(AccessoryType);
        if (RecipeModel === null) {
            return null;
        } else {
            return RecipeModel.findOneAndUpdate({title}, data, {new:true}).populate("ingredients", undefined, ingredientModel).populate("accessories", undefined, accessoryModel);
        }
    }
}