import prismaClient from "../../prisma"

interface ItemRequest{
    item_id: string
}

class RemoveItemService{
    async execute({item_id}: ItemRequest){
        const oder = await prismaClient.item.delete({
            where:{
                id: item_id
            }
        })
        return oder;
    }

}

export { RemoveItemService }