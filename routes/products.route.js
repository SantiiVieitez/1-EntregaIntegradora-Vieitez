import { Router} from "express";
import upload from "../utils/upload.middleware.js";

import ProductsDAO from "../daos/products.dao.js";

const router = Router();
export default router;

// /products -> Muestro todos los productos
// /products?stock -> Muestre todos los productos con stock
router.get("/", async (req, res) => {

    let withStock = req.query.stock;

    let products;
    if(withStock === undefined){
        products = await ProductsDAO.getAll();
    } else {
        products = await ProductsDAO.getAllWithStock();
    }
    res.render("products", {products,style:"css/products.css"});
});

// /products/new
router.get("/new", (req, res) => {
    res.render("new-product",{style:"css/new-product.css"});
})
// getbyid
router.get("/:id", async (req, res) => {

    let id = req.params.id;

    if(!id){
        res.redirect("/products/");
    }

    let product = await ProductsDAO.getById(id);

    if(!product){
        res.render("404");
    }

    res.render("product",{
        style:"css/product.css",
        title:product.title,
        description: product.description,
        photo: product.photo,
        price: product.price,
        isStock: product.stock > 0,
        
    });

});

// agregar producto
router.post("/", upload.single('image'), async (req, res) => {

    let filename = req.file.filename; // 17071
    let product = req.body;

    await ProductsDAO.add(product.title, product.description, filename, product.price, product.stock);

    res.redirect("/products");

})



