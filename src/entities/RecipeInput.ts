import {Field, InputType, ObjectType} from "type-graphql";
import {Length} from "class-validator";
import {IngredientType} from "./IngredientType";
import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {IngredientInput} from "./IngredientInput";

@InputType('RecipeInput')
@ObjectType('RecipeInput')
@modelOptions({ schemaOptions: { collection: 'recipes' } })
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

    @Field(() => [IngredientInput])
    @prop({ ref: IngredientInput })
    ingredients!: IngredientInput[];
}