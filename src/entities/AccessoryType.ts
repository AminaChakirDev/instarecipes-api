import {Field, ObjectType} from "type-graphql";
import {AccessoryInput} from "./AccessoryInput";

@ObjectType('AccessoryType')
export class AccessoryType extends AccessoryInput {

    @Field({nullable: true})
    _id: string;
}