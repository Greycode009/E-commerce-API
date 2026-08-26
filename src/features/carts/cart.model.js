import mongoose from "mongoose";


const cartItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    quantity: {
        type: Number,
        required: true,
        min: 1,
        default: 1,
    },
    price: {
        type: Number,
        required: true,
        min: 0,

    },
    imageUrl: {
        type: String,
        trim: true,
    },
}, {
    _id: false,
});

const cartSchema = new mongoose.Schema({
    consumerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    items: {
        type: [cartItemSchema],
        default: [],
    },

    subtotal: {
        type: Number,
        required: true,
        min: 0,
        default: 0,
    }
});