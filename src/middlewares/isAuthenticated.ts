/*import { NextFunction, Request, Response } from 'express'
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
}*/
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

interface PayLoad {
  sub: string;
}

// Extender a interface Request para incluir user_id
declare global {
  namespace Express {
    interface Request {
      user_id: string; // Declare como obrigatório ou opcional, mas de forma consistente
    }
  }
}

export function isAuthenticated(
  err:Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  // Definindo o tipo de retorno como void
  // Recebendo o token
  const authToken = req.headers.authorization;

  // Criando a verificação do token
  if (!authToken) {
    res.status(401).end(); // Retorna uma resposta, mas não um valor
    return; // Adicione um return aqui para garantir que a função não continue
  }

  const [, token] = authToken.split(" ");

  try {
    // Validar o token
    const { sub } = verify(token, process.env.JWT_SECRET as string) as PayLoad;

    // Recuperar o token dentro de uma variável dentro do request
    req.user_id = sub; // Atribuindo o user_id
    next(); // Chama next() sem retornar um valor
  } catch (err) {
    res.status(401).end(); // Retorna uma resposta, mas não um valor
    return; // Adicione um return aqui para garantir que a função não continue
  }
}