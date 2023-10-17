import { TicketsService } from "../services/tickets.service.js";
import { CartsService } from "../services/carts.service.js";
import { ProductsService } from "../services/products.service.js";
export class TicketsController {
    static async createTicket(req, res) {
        try {
            const cartId = req.params.cid;
            const cart = await CartsService.getCart(cartId);
            const productsCart = cart.products;
            let purchaseProducts = [];
            let rejectedProducts = [];

            // Itera por cada producto del carrito
            for (let i = 0; i < productsCart.length; i++) {
                const product = await ProductsService.getProducts(productsCart[i].productId); 

                     // Verifica si el producto tiene suficiente stock para la cantidad indicada
                if (productsCart[i].quantity <= product.stock) {
                    // Agrega el producto al carrito
                    purchaseProducts.push({
                        productId: product.id,
                        quantity: productsCart[i].quantity
                    });

                    // Actualiza el producto product.stock - quantity
                    product.stock -= productsCart[i].quantity;
                } else {
                    // Si el producto no tiene suficiente stock, agrégalo a la lista de productos rechazados
                    rejectedProducts.push({
                        productId: product.id,
                        quantity: productsCart[i].quantity
                    });
                }
            }

            // Genera un código de ticket automático
            const ticketCode = generateTicketCode();

            const newTicket = {
                code: ticketCode, 
                purchase_datetime: new Date(),
                amount: purchaseProducts.reduce((total, item) => total + (item.quantity * product.price), 0),
                purchaser: req.user.email,
                purchaseProducts,
                rejectedProducts
            };

            const ticketCreated = await TicketsService.createTicket(newTicket);

            // Filtra los productos que no se pudieron comprar y actualiza el carrito
            cart.products = cart.products.filter((product) => {
                return !rejectedProducts.some((rejected) => rejected.productId === product.productId);
            });

            // Actualiza el carrito
            await CartsService.updateCart(cart);

            if (rejectedProducts.length > 0) {
                res.json({ status: "partial", message: "Algunos productos no se pudieron comprar", rejectedProducts });
            } else {
                res.json({ status: "success", message: "Compra exitosa" });
            }
        } catch (error) {
            res.json({ status: "error", message: error.message });
        }
    }
}

// Genero un código de ticket automático
function generateTicketCode() {
    const prefix = "TICKET-";
    const randomString = Math.random().toString(36).substring(2, 8);
    const timestamp = Date.now();
    const ticketCode = prefix + randomString + "-" + timestamp;

    return ticketCode;
}
