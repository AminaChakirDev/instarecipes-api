import {Field, ObjectType} from "type-graphql";
import {RecipeInput} from "./RecipeInput";

@ObjectType('RecipeType')
export class RecipeType extends RecipeInput {

    @Field()
    _id: string;
}