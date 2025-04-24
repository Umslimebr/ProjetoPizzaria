import {Request, response, Response} from 'express'

import { CreateUserServicis } from '../../servecis/user/CreateUserServecis'

class CreatedUserControllers{
    async handle(req: Request, res:Response){
        const {nome, email, password} = req.body

        const createUserServicis = new CreateUserServicis()

        const user = await createUserServicis.execute({
            nome,
            email,
            password
        })
        
        return res.json(user)
    }
}

export {CreatedUserControllers}