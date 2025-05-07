import {Request, Response} from 'express';
import { CreateProductService } from '../../servecis/product/CreateProductService';

class CreateProdutController{
    async handle(req: Request, res:Response){
        const {nome,price,description,category_id} = req.body;


        const creaProductService = new CreateProductService();

        if(!req.file){
            throw new Error("Error upload file")
        }else{
            const {originalname, filename} = req.file;
            console.log(filename)

            const product = await creaProductService.execute({
            nome,
            price,
            description,
            banner:'',
            category_id
        }) ;

        return res.json(product);
        }

        
       
        
        
    }

}

export { CreateProdutController }
