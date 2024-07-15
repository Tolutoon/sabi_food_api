import mongoose from "mongoose";


const RecipieSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
}, {timestamps: true} );


const Recipe = mongoose.model("Recipe", RecipieSchema);

export default Recipe;