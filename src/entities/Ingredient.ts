import {Field, InputType, ObjectType} from "type-graphql";
import {IsString, Length} from "class-validator";
import {prop} from "@typegoose/typegoose";

@ObjectType('IngredientType')
@InputType('IngredientInput')
export class Ingredient {

    @Field()
    @Length(3,20)
    @prop()
    title!: string;

    @Field()
    @prop()
    icon: string;
}