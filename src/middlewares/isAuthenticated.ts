import { NextFunction, Request, Response } from 'express'
import { verify} from 'jsonwebtoken'

interface PayLoad{
    sub: string;
}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){
    //recebendo o token

    const authToken = req.headers.authorization;

    //criando a verificação do token

    if(!authToken){
        return res.status(401).end();
    }
    const [, token] = authToken.split( " " )
    
    try{
        //validar o token
        
        const { sub } = verify(
            token,
            process.env.JWT_SECRET
        ) as PayLoad;
        //recuperar o token dentro de uma varivel dentro do request
        req.user_id = sub;
       return next();
       
    }catch(err){
        return res.status(401).end()
    }

    //return next()
}