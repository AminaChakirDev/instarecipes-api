import {Arg, Mutation, Query, Resolver} from "type-graphql";
import {getModelForClass} from "@typegoose/typegoose";
import {CategoryType} from "../entities/CategoryType";
import {CategoryInput} from "../entities/CategoryInput";

@Resolver(() => CategoryType)
export class CategoriesResolver {

    @Query(() => [CategoryType])
    public async getCategories(): Promise<CategoryType[]> {
        const CategoryModel = getModelForClass(CategoryType);
        return CategoryModel.find().exec();
    }

    @Query(() => CategoryType, {nullable: true})
    public async getCategoryByName(@Arg('title') title: string): Promise <CategoryType> {
        const CategoryModel = getModelForClass(CategoryType);
        return CategoryModel.findOne({ title }).exec();
    }

    @Query(() => CategoryType, {nullable: true})
    public async getCategoryById(@Arg('title') title: string): Promise <CategoryType> {
        const CategoryModel = getModelForClass(CategoryType);
        return CategoryModel.findOne({ title }).exec();
    }

    @Mutation(() => CategoryType, {nullable: true})
    public async createCategory(@Arg('data', () => CategoryInput) data: CategoryInput): Promise<CategoryType> {
        const CategoryModel = getModelForClass(CategoryInput);
        return CategoryModel.create(data);
    }

    @Mutation(() => Boolean)
    public async deleteCategory(@Arg('title') title: string): Promise<Boolean> {
        const CategoryModel = getModelForClass(CategoryType);
        await CategoryModel.deleteOne({ title }).exec();
        return true;
    }

    @Mutation(() => CategoryType, {nullable: true})
    public async updateCategory(@Arg('title') title: string, @Arg('data', () => CategoryInput) data: CategoryType): Promise<CategoryType> {
        const CategoryModel = getModelForClass(CategoryInput);
        if (CategoryModel === null) {
            return null;
        } else {
            return CategoryModel.findOneAndUpdate({title}, data, {new:true});
        }
    }

}