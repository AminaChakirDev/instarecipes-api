import { ApolloServer } from "apollo-server";
import 'reflect-metadata';
import {buildSchema} from "type-graphql";
import {RecipesResolver} from "./resolvers/Recipes";
import mongoose from "mongoose";
import {IngredientsResolver} from "./resolvers/Ingredients";
import {AccessoriesResolver} from "./resolvers/Accessories";
import {CategoriesResolver} from "./resolvers/Categories";

const PORT = process.env.PORT || 4000;

async function bootstrap() {
    await mongoose
        .connect('mongodb://127.0.0.1:27017/instarecipes', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: true,
        });

    const schema = await buildSchema({ resolvers: [
        RecipesResolver,
        IngredientsResolver,
        AccessoriesResolver,
        CategoriesResolver
    ] })
    const server = new ApolloServer({
        schema,
        playground: true,
    });

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();