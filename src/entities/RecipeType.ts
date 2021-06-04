import {Field, ObjectType} from "type-graphql";
import {RecipeInput} from "./RecipeInput";
import {prop} from "@typegoose/typegoose";
import {IngredientType} from "./IngredientType";
import {CategoryType} from "./CategoryType";
import {AccessoryType} from "./AccessoryType";

@ObjectType('RecipeType')
export class RecipeType extends RecipeInput {

    @Field()
    _id: string;

    @Field(() => [IngredientType])
    @prop({ ref: () => IngredientType })
    ingredients!: IngredientType[];

    @Field(() => [AccessoryType])
    @prop({ ref: () => AccessoryType })
    accessories!: AccessoryType[];

    @Field(() => [CategoryType])
    @prop({ ref: () => CategoryType })
    categories!: CategoryType[];
}