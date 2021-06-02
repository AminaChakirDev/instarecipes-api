import {Field, ObjectType} from "type-graphql";
import {RecipeInput} from "./RecipeInput";
import {IngredientInput} from "./IngredientInput";
import {prop} from "@typegoose/typegoose";
import {IngredientType} from "./IngredientType";

@ObjectType('RecipeType')
export class RecipeType extends RecipeInput {

    @Field()
    _id: string;

    @Field(() => [IngredientType])
    @prop({ ref: () => IngredientType })
    ingredients!: IngredientType[];
}