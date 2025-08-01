import {Request, Response } from "express";
import { ListByCategoryServices } from "../../servecis/product/ListByCategoryServices";

class ListByCategoryControllers{
    async handle(req:Request, res:Response){
        const category_id = req.query.category_id as string;
        const listByCategory = new ListByCategoryServices();
        const products = await listByCategory.execute({
            category_id
        });
        return res.json(products)
    }
}

export { ListByCategoryControllers }