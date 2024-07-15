import mongoose from "mongoose";

const RecipeSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    }
}, { timestamps: true });

const Recipe = mongoose.model("Recipe", RecipeSchema);

export default Recipe;