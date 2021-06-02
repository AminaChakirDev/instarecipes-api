import { ApolloServer } from "apollo-server";
import 'reflect-metadata';
import {buildSchema} from "type-graphql";
import {RecipesResolver} from "./resolvers/Recipes";
import mongoose from "mongoose";

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

    const schema = await buildSchema({ resolvers: [RecipesResolver] })
    const server = new ApolloServer({
        schema,
        playground: true,
    });

    // Start the server
    const { url } = await server.listen(PORT);
    console.log(`Server is running, GraphQL Playground available at ${url}`);
}

bootstrap();