import {NextFunction, Request, Response} from "express"
import { ListCategoryService } from "../../servecis/category/ListCategoryService"

class ListCategoryController{
    async handle(req:Request, res:Response, next:NextFunction):Promise<Response>{
        const listCategoryService = new ListCategoryService();
        const category = await listCategoryService.execute();

        return res.json(category)
    }
}

export { ListCategoryController }