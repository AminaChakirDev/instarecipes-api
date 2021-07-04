import {Field, ObjectType} from "type-graphql";
import {IngredientInput} from "./IngredientInput";

@ObjectType('IngredientType')
export class IngredientType extends IngredientInput {

    @Field({nullable: true})
    _id: string;
}