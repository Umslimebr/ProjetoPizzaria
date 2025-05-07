import {Router, Request, Response} from "express";

import multer from "multer"

import { CreatedUserControllers } from "./controllers/user/CreateUserControllers";
import { AuthUserControler } from "./controllers/user/AuthUserControler";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProdutController } from "./controllers/product/CreateProdutController";

import {isAuthenticated} from './middlewares/isAuthenticated'

import uploadconfig from './config/multer'

const router = Router();

const upload = multer(uploadconfig.upload("./tmp"))

// -- Routas Users --
router.post('/users', new CreatedUserControllers().handle)

router.post("/session", new AuthUserControler().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

//Rotas categorias

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//Rotas Produtos

router.post('/product',  isAuthenticated, upload.single('file'), new CreateProdutController().handle)




export {router}