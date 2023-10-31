import { productDao } from "../dao/factory.js";

export class ViewsController {
    static renderHome = (req, res) => {
        res.render("home");
    };
    static renderSignup = (req, res) => {
        res.render("signup");
    };
    static renderLogin = (req, res) => {
        res.render("login");
    };
    //chequear ruta de perfil
    static renderProfile = (req, res) => {
        console.log(req.user);
        res.render("profile", { user: JSON.parse(JSON.stringify(req.user)) });
    }
    static renderForgotPassword = (req, res) => {
        res.render("forgotPassword");
    }
    static renderResetPassword = (req, res) => {
        const token = req.query.token;
        res.render("resetPassword", {token});

}

    static renderChat = (req, res) => {
        res.render("chat")
    }
    static renderProducts = async (req, res) => {
        try {
            const { limit = 10, page = 1, stock, sort = "asc" } = req.query;
            const stockValue = stock === 0 ? undefined : parseInt(stock);
            if (!["asc", "desc"].includes(sort)) {
                return res.render("products", { error: "Orden no válido" })
            };
            const sortValue = sort === "asc" ? 1 : -1;
            let query = {};
            if (stockValue) {
                query = { category: "categoria", stock: { $gte: stockValue } }
            }
            const result = await productDao.getWithPaginate(query, {
                page,
                limit,
                sort: { price: sortValue },
                lean: true
            });
            // console.log(result);
            // asi capturo la ruta de mi servidor capturo el protocolo"http" y el host: "localhost"
            const baseUrl = `${req.protocol}://${req.get("host")}${req.originalUrl}`
            const resultProductsView = {
                status: "success",
                payload: result.docs,
                totalPages: result.totalPages,
                page: result.page,
                prevPage: result.prevPage,
                hasPrevPage: result.hasPrevPage,
                prevLink: result.hasPrevPage ? baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`) : null,
                nextPage: result.nextPage,
                hasNextPage: result.hasNextPage,
                nextLink: result.hasNextPage ? baseUrl.includes("page") ? baseUrl.replace(`page=${result.page}`,
                    `page=${result.nextPage}`) : baseUrl.includes("?") ? baseUrl.concat(`&page=${result.nextPage}`) :
                    baseUrl.concat(`?page=${result.nextPage}`) : null
            }
            console.log(resultProductsView);
            res.render("products", resultProductsView);
        } catch (error) {
            console.log(error.message)
            res.render("products", { error: "No es posible visualizar los productos" });
        }
    }
    // este no lo estoy usando actualmente
    static renderRealTimeProducts = async (req, res) => {
        try {
            const listaproductos = await pmanagersocket.getProducts({})
            console.log(listaproductos);
            res.render("realTimeProducts", { listaproductos: listaproductos });
        } catch (error) {
            console.error("Error en la ruta /realTimeProducts:", error);
            res.status(500).send("Error interno del servidor");
        }
    }
}