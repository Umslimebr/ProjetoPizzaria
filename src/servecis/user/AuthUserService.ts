
import prismaClient from "../../prisma";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";



interface AuthRequest{
    email:string;
    password:string;
}
class AuthUserService{
    async execute({email, password}: AuthRequest){
        //verificar se o email já existe
            const user = await prismaClient.user.findFirst({
                where:{
                    email:email
                }
            })

            if(!user){
                throw new Error("user/password incorrect")
            }
            //verificar agora a senha


            const passowrdMatch = await compare(password, user.password)

            if(!passowrdMatch){
                throw new Error("user/password incorrect")
            }

            //gerando token
            const token = sign(
               {
                nome: user.nome,
                email: user.email
               },
               process.env.JWT_SECRET,
               {
                subject: user.id,
                expiresIn: '30d'
               }

            )
               
        
            return {
                id: user.id,
                nome: user.nome,
                email: user.email,
                token: token
            }

    }
}

export { AuthUserService }