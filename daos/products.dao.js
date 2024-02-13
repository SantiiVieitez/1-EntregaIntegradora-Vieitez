import Products from "../schemas/products.schema.js";

class ProductsDAO {

    static async getAll() {
        try {
            return await Products.find().lean();
        } catch (error) {
            console.error("Error in getAll:", error);
            throw error;
        }
    }

    static async getAllWithStock() {
        try {
            return await Products.find({stock:{$gt:0}}).lean();
        } catch (error) {
            console.error("Error in getAllWithStock:", error);
            throw error;
        }
    }

    static async getById(id) {
        try {
            return await Products.findOne({ _id: id }).lean();
        } catch (error) {
            console.error("Error in getById:", error);
            throw error;
        }
    }

    static async add(title, description, photo, price, stock) {
        try {
            return await new Products({title, description, photo, price, stock}).save();
        } catch (error) {
            console.error("Error in add:", error);
            throw error;
        }
    }

    static async update(id, data) {
        try {
            return await Products.findOneAndUpdate({ _id: id }, data);
        } catch (error) {
            console.error("Error in update:", error);
            throw error;
        }
    }

    static async remove(id) {
        try {
            return await Products.findByIdAndDelete(id);
        } catch (error) {
            console.error("Error in remove:", error);
            throw error;
        }
    }

}

export default ProductsDAO;
