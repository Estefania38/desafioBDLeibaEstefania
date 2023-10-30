import mongoose from "mongoose";
import { cartsCollection } from "../../constants/index.js";

const cartsSchema = new mongoose.Schema({
  // aca definimos las propiedades y caracteristicas para el documento de un schema
  id: mongoose.Types.ObjectId, // Campo para el ID de Mongoose

  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "business"
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users"
  },
  products: {
    type: [
      {
        _id: {
          type: mongoose.Types.ObjectId,
          ref: "Product" //ver si es product o products
        },
        quantity: {
          type: Number,
          default: 1
        },
      },
    ],
    price: {
      type: Number,
      required: true
    },
    default: [],
  },
  status: {
    type: String,
    default: 'pendiente'
  },
});
cartsSchema.pre('find', function (next) {
  this.populate('products._id');
  next();
});

export const cartsModel = mongoose.model(cartsCollection, cartsSchema);

const Cart = mongoose.model("cart", cartsSchema);

export default Cart;




