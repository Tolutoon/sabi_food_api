import mongoose from "mongoose";


const PharmacySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    imgUrl: {
        type: String,
        rewuired: true
    }
}, {timestamps: true});

const Pharmacy = mongoose.model("Phamaracy", PharmacySchema);

export default Pharmacy;