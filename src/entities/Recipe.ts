import {Field, InputType, ObjectType} from "type-graphql";
import {IsString, Length} from "class-validator";
import {Ingredient} from "./Ingredient";
import {prop} from "@typegoose/typegoose";

@ObjectType('RecipeType')
@InputType('RecipeInput')
export class Recipe {

    @Field()
    @Length(3,20)
    @prop()
    title!: string;

    @Field()
    @prop()
    instagramUrl!: string;

    @Field()
    @prop()
    instagramAuthor!: string;

    @Field(() => [Ingredient])
    @prop()
    ingredients!: Ingredient[];
}