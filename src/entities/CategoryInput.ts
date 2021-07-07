import {Field, InputType, ObjectType} from "type-graphql";
import {Length} from "class-validator";
import {modelOptions, prop} from "@typegoose/typegoose";

@ObjectType('CategoryInput')
@InputType('CategoryInput')
@modelOptions({ schemaOptions: { collection: 'categories' } })
export class CategoryInput {

    @Field({nullable: true})
    _id: string;

    @Field()
    @Length(3,20)
    @prop()
    title!: string;

    @Field()
    @prop()
    slug!: string;

    @Field()
    @prop()
    icon: string;
}