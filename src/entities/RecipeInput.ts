import {Field, ID, InputType, ObjectType} from "type-graphql";
import {IsString, Length} from "class-validator";
import {Ingredient} from "./Ingredient";
import {prop} from "@typegoose/typegoose";

@InputType('RecipeInput')
export class RecipeInput {

    @Field()
    @Length(3,50)
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