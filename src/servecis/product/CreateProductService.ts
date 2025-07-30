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
        const product = await prismaClient.product.create({
            data:{
                nome:nome,
                price:price,
                description:description,
                banner:banner,
                category_id:category_id
            }
        })
        return product
    }
}

export { CreateProductService }