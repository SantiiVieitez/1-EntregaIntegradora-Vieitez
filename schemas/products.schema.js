import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    photo:{
        type:String
    }
});

export default mongoose.model("products", ProductsSchema);