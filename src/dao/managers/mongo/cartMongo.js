import { cartsModel } from "../../models/carts.model.js";


export class CartsMongo {

  constructor() {
    this.cart = cartsModel;
  };

  async getCarts() {
    try {
      const carts = await cart.find().lean();
      return carts;
    } catch (error) {
      throw error;
      
    }
  };

  async save() {
    try {
      const cartCreated = await this.model.create({});
      return cartCreated;
    } catch (error) {
      throw error;
    }
  }

  async getCartById(cartId) {
    try {
      const cart = await cart.findById(cartId);
      return cart;
    } catch (error) {
      throw error;
    }
  }

  addCart = async (products) => {
    try {
      let cartData = {};
      if (products && products.length > 0) {
        cartData.products = products;
      }

      const cart = await cart.create(cartData);
      return cart;
    } catch (err) {
      console.error('Error al crear el carrito:', err.message);
      return err;
    }
  };

  addProductInCart = async (cartId, obj) => {
    try {
      const filter = { _id: cartId, "products._id": obj._id };
      const cart = await cart.findById(cartId);
      const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

      if (findProduct) {
        const update = { $inc: { "products.$.quantity": obj.quantity } };
        await cart.updateOne(filter, update);
      } else {
        const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
        await cart.updateOne({ _id: cartId }, update);
      }

      return await cart.findById(cartId);
    } catch (err) {
      console.error('Error al agregar el producto al carrito:', err.message);
      return err;
    }
  };

  deleteProductInCart = async (cid, products) => {
    try {
      return await cart.findOneAndUpdate(
        { _id: cid },
        { products },
        { new: true })

    } catch (err) {
      return err
    }

  }
  updateOneProduct = async (cid, products) => {

    await cart.updateOne(
      { _id: cid },
      { products })
    return await cart.findOne({ _id: cid })
  };
};
