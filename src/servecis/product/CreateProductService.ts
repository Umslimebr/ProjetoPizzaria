import prismaClient from "../../prisma";

interface ProductRequest{
    nome:string;
    price:string;
    description:string;
    banner:string;
    category_id:string
}

class CreateProductService{
    async execute({nome,price,description,banner,category_id}:ProductRequest){

        return {ok:true}
    }
}

export { CreateProductService }