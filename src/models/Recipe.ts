import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    title: String,
    instagramUrl: { type: String, unique: true },
    instagramAuthor: String,
    ingredients: [{ title: String, icon: String }],
});

export const RecipeModel = mongoose.model('RecipeModel', RecipeSchema);
