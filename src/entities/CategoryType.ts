import {Field, ObjectType} from "type-graphql";
import {CategoryInput} from "./CategoryInput";

@ObjectType('CategoryType')
export class CategoryType extends CategoryInput {

    @Field({nullable: true})
    _id: string;
}