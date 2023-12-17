import { cartsModel } from "../../models/carts.model.js";


export class CartsMongo {

  constructor() {
    this.model = cartsModel;
  };

  async getCart() {
    try {
      const carts = await this.model.find().lean();
      return carts;
    } catch (error) {
      throw new Error("Hubo un error al obtener los carritos 1");
    }
  };

  async createCart (cart) {
    try {
      const cartCreated = await this.model.create(cart);
      if (!cart) {
        throw new Error("Hubo un error al obtener el carrito");
      }
      return cartCreated;
    } catch (error) {
      throw new Error("Hubo un error al obtener el carrito");
    }
  }


  async getCartById(cid) {
    try {
      const cart = await this.model.findById(cid);
      if(!cart){
        throw new Error("Hubo un error al obtener el carrito");
    }
      return cart;
    } catch (error) {
      throw new Error("Hubo un error al obtener el carrito");
    }
  }

  addCart = async (products) => {
    try {
      let cartData = {};
      if (products && products.length > 0) {
        cartData.products = products;
      }

      const cart = await this.model.create(cartData);
      return cart;
    } catch (err) {
      console.error('Error al crear el carrito:', err.message);
      return err;
    }
  };

  addProductInCart = async (cid, obj) => {
    try {
      const filter = { _id: cid, "products._id": obj._id };
      const cart = await this.model.findById(cid);
      const findProduct = cart.products.some((product) => product._id.toString() === obj._id);

      if (findProduct) {
        const update = { $inc: { "products.$.quantity": obj.quantity } };
        await this.model.updateOne(filter, update);
      } else {
        const update = { $push: { products: { _id: obj._id, quantity: obj.quantity } } };
        await this.model.updateOne({ _id: cid }, update);
      }

      return await this.model.findById(cid);
    } catch (err) {
      console.error('Error al agregar el producto al carrito:', err.message);
      return err;
    }
  };

  deleteProductInCart = async (cid, products) => {
    try {
      return await this.model.findOneAndUpdate(
        { _id: cid },
        { products },
        { new: true })

    } catch (err) {
      return err
    }

  }

  async update(cid,cart){
    try {
        const cartUpdated = await this.model.findByIdAndUpdate(cid, cart, {new:true});
        return cartUpdated;
    }
    catch (error) {
        console.error(error.message);
    }
}

  updateOneProduct = async (cid, products) => {

    await this.model.updateOne(
      { _id: cid },
      { products })
    return await this.model.findOne({ _id: cid })
  };
};
