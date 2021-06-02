import { Recipe } from "../entities/Recipe";
import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getModelForClass} from "@typegoose/typegoose";

@Resolver(() => Recipe)
export class RecipesResolver {

    @Query(() => [Recipe])
    public async getRecipes(): Promise<Recipe[]> {
        const RecipeModel = getModelForClass(Recipe);
        return RecipeModel.find().exec();
    }

    @Query(() => Recipe, {nullable: true})
    public async getRecipe(@Arg('title') title: string): Promise <Recipe> {
        const RecipeModel = getModelForClass(Recipe);
        return RecipeModel.findOne({ title }).exec();
    }

    @Mutation(() => Recipe, {nullable: true})
    public async createRecipe(@Arg('data', () => Recipe) data: Recipe): Promise<Recipe> {
        const RecipeModel = getModelForClass(Recipe);
        return RecipeModel.create(data);
    }

    @Mutation(() => Boolean)
    public async deleteRecipe(@Arg('title') title: string): Promise<Boolean> {
        const RecipeModel = getModelForClass(Recipe);
        await RecipeModel.deleteOne({ title }).exec();
        return true;
    }

    @Mutation(() => Recipe, {nullable: true})
    public async updateRecipe(@Arg('title') title: string, @Arg('data', () => Recipe) data: Recipe): Promise<Recipe> {
        const RecipeModel = getModelForClass(Recipe);
        if (RecipeModel === null) {
            return null;
        } else {
            return RecipeModel.findOneAndUpdate({title}, data, {new:true});
        }
    }

    //@Mutation(returns => Recipe, {nullable: true})
    //public async deleteRecipe(@Arg('title', type => String) title: string) {
   //     return null;
    //}
}