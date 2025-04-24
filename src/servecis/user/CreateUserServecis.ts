

import prismaClient from '../../prisma'
import { hash } from 'bcryptjs';

interface UserRequest{
    nome:string;
    email:string;
    password:string;
}

class CreateUserServicis{
    async execute({nome, email, password}: UserRequest){
        //verificação do email
        if(!email){
            throw new Error ("email incorreto")
        }

         //verificando se o email já foi cadastrado
        const userAlredyExists = await prismaClient.user.findFirst({
            where:{
                email:email
            }
        })
        if(userAlredyExists){
            throw new Error("usuario já cadastrado! por favor faça login ou digite um email diferente!")
        }
        
        //criptografando senhas
        const passwordHash = await hash(password,8)



        //cadastrando o client
        const user = await prismaClient.user.create({
            data:{
                nome:nome,
                email:email,
                password:passwordHash,
            },
            select:{
                id:true,
                nome:true,
                email:true,
            }
        });

        return user
    }
}
export {CreateUserServicis}