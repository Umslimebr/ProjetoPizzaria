import prismaClient from "../../prisma";


interface OrderRequest{
    table: number,
    nome: string
}

class CreatOrderServices{
    async execute({table, nome}: OrderRequest){
        const order = await prismaClient.order.create({
            data:{
                table:table,
                nome:nome
            }
        })
        return order
    }


}

export {CreatOrderServices}