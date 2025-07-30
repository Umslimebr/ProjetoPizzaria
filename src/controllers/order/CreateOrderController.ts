import {Request, Response} from 'express'
import {CreatOrderServices} from '../../servecis/order/CreatOrderServices'

class CreateOrderController{
    async handle(req:Request, res:Response){
        const {table, nome} = req.body

        const createOrderService = new CreatOrderServices();

        const order = await createOrderService.execute({
            table,
            nome
        });

        return res.json(order)
    }
}

export {CreateOrderController}