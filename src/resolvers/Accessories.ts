import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getModelForClass} from "@typegoose/typegoose";
import {AccessoryType} from "../entities/AccessoryType";
import {AccessoryInput} from "../entities/AccessoryInput";

@Resolver(() => AccessoryType)
export class AccessoriesResolver {

    @Query(() => [AccessoryType])
    public async getAccessories(): Promise<AccessoryType[]> {
        const AccessoryModel = getModelForClass(AccessoryType);
        return AccessoryModel.find().exec();
    }

    @Query(() => AccessoryType, {nullable: true})
    public async getAccessoryByName(@Arg('title') title: string): Promise <AccessoryType> {
        const AccessoryModel = getModelForClass(AccessoryType);
        return AccessoryModel.findOne({ title }).exec();
    }

    @Query(() => AccessoryType, {nullable: true})
    public async getAccessoryById(@Arg('title') title: string): Promise <AccessoryType> {
        const AccessoryModel = getModelForClass(AccessoryType);
        return AccessoryModel.findOne({ title }).exec();
    }

    @Mutation(() => AccessoryType, {nullable: true})
    public async createAccessory(@Arg('data', () => AccessoryInput) data: AccessoryInput): Promise<AccessoryType> {
        const AccessoryModel = getModelForClass(AccessoryInput);
        return AccessoryModel.create(data);
    }

    @Mutation(() => Boolean)
    public async deleteAccessory(@Arg('title') title: string): Promise<Boolean> {
        const AccessoryModel = getModelForClass(AccessoryType);
        await AccessoryModel.deleteOne({ title }).exec();
        return true;
    }

    @Mutation(() => AccessoryType, {nullable: true})
    public async updateAccessory(@Arg('title') title: string, @Arg('data', () => AccessoryInput) data: AccessoryType): Promise<AccessoryType> {
        const AccessoryModel = getModelForClass(AccessoryInput);
        if (AccessoryModel === null) {
            return null;
        } else {
            return AccessoryModel.findOneAndUpdate({title}, data, {new:true});
        }
    }

}