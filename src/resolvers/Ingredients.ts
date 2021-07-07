import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getModelForClass} from "@typegoose/typegoose";
import {IngredientType} from "../entities/IngredientType";
import {IngredientInput} from "../entities/IngredientInput";

@Resolver(() => IngredientType)
export class IngredientsResolver {

    @Query(() => [IngredientType])
    public async getIngredients(): Promise<IngredientType[]> {
        const IngredientModel = getModelForClass(IngredientType);
        return IngredientModel.find().exec();
    }

    @Query(() => IngredientType, {nullable: true})
    public async getIngredientByName(@Arg('title') title: string): Promise <IngredientType> {
        const IngredientModel = getModelForClass(IngredientType);
        return IngredientModel.findOne({ title }).exec();
    }

    @Query(() => IngredientType, {nullable: true})
    public async getIngredientById(@Arg('_id') _id: string): Promise <IngredientType> {
        const IngredientModel = getModelForClass(IngredientType);
        return IngredientModel.findOne({ _id }).exec();
    }

    @Mutation(() => IngredientType, {nullable: true})
    public async createIngredient(@Arg('data', () => IngredientInput) data: IngredientInput): Promise<IngredientType> {
        const IngredientModel = getModelForClass(IngredientInput);
        return IngredientModel.create(data);
    }

    @Mutation(() => Boolean)
    public async deleteIngredient(@Arg('_id') _id: string): Promise<Boolean> {
        const IngredientModel = getModelForClass(IngredientType);
        await IngredientModel.deleteOne({ _id }).exec();
        return true;
    }

    @Mutation(() => IngredientType, {nullable: true})
    public async updateIngredient(@Arg('_id') _id: string, @Arg('data', () => IngredientInput) data: IngredientType): Promise<IngredientType> {
        const IngredientModel = getModelForClass(IngredientInput);
        if (IngredientModel === null) {
            return null;
        } else {
            return IngredientModel.findOneAndUpdate({_id}, data, {new:true});
        }
    }

}