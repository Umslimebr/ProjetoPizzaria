import prismaClient from "../../prisma";


interface CategoryRequest{
    nome:string
}

class CreateCategoryService{
    async execute({nome}:CategoryRequest){

        if(nome === ""){
            throw new Error("nome invalido")
        }
        const category = await prismaClient.category.create({
            data:{
                nome:nome,
            },
            select:{
                id:true,
                nome:true
            }
        })


        return category
    }
}

export { CreateCategoryService }