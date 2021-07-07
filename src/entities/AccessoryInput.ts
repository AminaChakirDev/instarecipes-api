import {Field, InputType, ObjectType} from "type-graphql";
import {Length} from "class-validator";
import {modelOptions, prop} from "@typegoose/typegoose";

@ObjectType('AccessoryInput')
@InputType('AccessoryInput')
@modelOptions({ schemaOptions: { collection: 'Accessories' } })
export class AccessoryInput {

    @Field({nullable: true})
    _id: string;

    @Field()
    @prop()
    title!: string;

    @Field()
    @prop()
    slug!: string;

    @Field()
    @prop()
    icon: string;
}