import {Field, InputType, ObjectType} from "type-graphql";
import {Length} from "class-validator";
import {modelOptions, prop} from "@typegoose/typegoose";

@ObjectType('IngredientInput')
@InputType('IngredientInput')
@modelOptions({ schemaOptions: { collection: 'ingredients' } })
export class IngredientInput {

    @Field({nullable: true})
    _id: string;

    @Field()
    @Length(3,20)
    @prop()
    title!: string;

    @Field()
    @prop()
    icon: string;

    @Field({nullable: true})
    __typename: undefined

}