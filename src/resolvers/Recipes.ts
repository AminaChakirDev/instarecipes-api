import { RecipeType } from "../entities/RecipeType";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getModelForClass} from "@typegoose/typegoose";
import {RecipeInput} from "../entities/RecipeInput";
import {IngredientType} from "../entities/IngredientType";
import {AccessoryType} from "../entities/AccessoryType";
import {CategoryType} from "../entities/CategoryType";

@Resolver(() => RecipeType)
export class RecipesResolver {

    @Query(() => [RecipeType])
    public async getRecipes(): Promise<RecipeType[]> {
        const RecipeModel = getModelForClass(RecipeType);
        const IngredientModel = getModelForClass(IngredientType);
        const AccessoryModel = getModelForClass(AccessoryType);
        const CategoryModel = getModelForClass(CategoryType);
        return RecipeModel
            .find()
            .populate("ingredients", undefined, IngredientModel)
            .populate("accessories", undefined, AccessoryModel)
            .populate("categories", undefined, CategoryModel)
            .exec();
    }

    @Query(() => RecipeType, {nullable: true})
    public async getRecipeByName(@Arg('title') title: string): Promise <RecipeType> {
        const RecipeModel = getModelForClass(RecipeType);
        const IngredientModel = getModelForClass(IngredientType);
        const AccessoryModel = getModelForClass(AccessoryType);
        const CategoryModel = getModelForClass(CategoryType);
        return RecipeModel
            .findOne({ title })
            .populate("ingredients", undefined, IngredientModel)
            .populate("accessories", undefined, AccessoryModel)
            .populate("categories", undefined, CategoryModel)
            .exec();
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
    public async deleteRecipe(@Arg('_id') _id: string): Promise<Boolean> {
        const RecipeModel = getModelForClass(RecipeType);
        await RecipeModel.deleteOne({ _id }).exec();
        return true;
    }

    @Mutation(() => RecipeType, {nullable: true})
    public async updateRecipe(@Arg('_id') _id: string, @Arg('data', () => RecipeInput) data: RecipeType): Promise<RecipeType> {
        const RecipeModel = getModelForClass(RecipeInput);
        const IngredientModel = getModelForClass(IngredientType);
        const AccessoryModel = getModelForClass(AccessoryType);
        const CategoryModel = getModelForClass(CategoryType);
        if (RecipeModel === null) {
            return null;
        } else {
            return RecipeModel
                .findOneAndUpdate({_id}, data, {new:true})
                .populate("ingredients", undefined, IngredientModel)
                .populate("accessories", undefined, AccessoryModel)
                .populate("categories", undefined, CategoryModel);
        }
    }
}