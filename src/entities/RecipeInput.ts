import {Field, InputType, ObjectType} from "type-graphql";
import {Length} from "class-validator";
import {modelOptions, prop, Ref} from "@typegoose/typegoose";
import {IngredientInput} from "./IngredientInput";
import {AccessoryInput} from "./AccessoryInput";
import {CategoryInput} from "./CategoryInput";

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

    @Field()
    @prop()
    preparationTime!: number;

    @Field()
    @prop()
    createdAt!: string;

    @Field()
    @prop()
    updatedAt!: string;

    @Field()
    @prop()
    onTop!: boolean;

    @Field(() => [IngredientInput])
    @prop({ ref: IngredientInput })
    ingredients!: IngredientInput[];

    @Field(() => [AccessoryInput])
    @prop({ ref: AccessoryInput })
    accessories!: AccessoryInput[];

    @Field(() => [CategoryInput])
    @prop({ ref: CategoryInput })
    categories!: CategoryInput[];
}