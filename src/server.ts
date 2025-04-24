import express, {Request, Response, NextFunction} from 'express'
import 'express-async-errors';
import cors from 'cors'
import {router} from './routes'


const app = express()
app.use(express.json())
app.use(cors());

app.use(router)
app.use((err:Error, req:Request, res:Response, Next:NextFunction)=>{
    if(err instanceof Error){
        //se for uma instancio do tipo erro
        return res.status(400).json({
            error:err.message
        })
    }
    return res.status(500).json({
        status: "error",
        message:'Internal Server error'
    })
})

app.listen(3333, () => console.log('tudo certo servidor online'))