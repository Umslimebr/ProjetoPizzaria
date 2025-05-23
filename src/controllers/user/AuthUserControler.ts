import { Request, Response } from "express";
import { AuthUserService } from "../../servecis/user/AuthUserService";

class AuthUserControler{
    async handle(req:Request, res:Response){
        const{email, password} = req.body;

        const authUserService = new AuthUserService();


        const auth =  await authUserService.execute({
            email,
            password
        })

        return res.json(auth)
    }
}

export { AuthUserControler }