import mongoose from "mongoose";

const RestaurantSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, "Please eenter a restuarant name"]
        },
        address: {
            type: String,
            required: true,
        },
        imgUrl: {
            type: String,
            required: true,
        },
        recipes: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Recipe"
        }]
    },
    {
        timestamps: true,
    }
)

const Restaurant = mongoose.model("Restaurant", RestaurantSchema);

export default Restaurant;