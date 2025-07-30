import {Router, Request, Response, RequestHandler} from "express";

import multer from "multer";



import { CreatedUserControllers } from "./controllers/user/CreateUserControllers";
import { AuthUserControler } from "./controllers/user/AuthUserControler";
import { DetailUserController } from "./controllers/user/DetailUserController";

import { CreateCategoryController } from "./controllers/category/CreateCategoryController";
import { ListCategoryController } from "./controllers/category/ListCategoryController";

import { CreateProdutController } from "./controllers/product/CreateProdutController";
import { ListByCategoryControllers } from "./controllers/product/ListByCategoryControllers";

import { CreateOrderController} from './controllers/order/CreateOrderController'
import { RemoveOrderController} from "./controllers/order/RemoveOrderController"
import { AddItemController } from "./controllers/order/AddItemController"
import { RemoveItemController } from './controllers/order/RemoveItemController'
import { SendOrderController} from "./controllers/order/SendOrderController"
import { ListOrderController} from "./controllers/order/ListOrderController"
import { DetailOrderController} from "./controllers/order/DetailOrderController"
import { FinishOrderController } from "./controllers/order/FinishOrderController";

import {isAuthenticated} from './middlewares/isAuthenticated'

import uploadConfig from './config/multer'

const router = Router();

const upload = multer(uploadConfig.upload("./tmp"));



// -- Routas Users --
router.post('/users', new CreatedUserControllers().handle)

router.post("/session", new AuthUserControler().handle)

router.get('/me', isAuthenticated, new DetailUserController().handle)

//Rotas categorias

router.post('/category', isAuthenticated, new CreateCategoryController().handle)

router.get('/category', isAuthenticated, new ListCategoryController().handle)

//Rotas Produtos

router.post('/product', isAuthenticated, upload.single('file'), new CreateProdutController().handle)

router.get('/category/product', isAuthenticated, new ListByCategoryControllers().handle)

//Rotas Orders

router.post('/order', isAuthenticated, new CreateOrderController().handle)
router.delete('/order', isAuthenticated, new RemoveOrderController().handle)

router.post('/order/add', isAuthenticated, new AddItemController().handle)

router.delete('/order/remove', isAuthenticated, new RemoveItemController().handle)
router.put('/order/send', isAuthenticated, new SendOrderController().handle)

router.get('/orders', isAuthenticated, new ListOrderController().handle)
router.get('/detalhes/order', isAuthenticated, new DetailOrderController().handle)

router.put('/order/finish', isAuthenticated, new FinishOrderController().handle)


export {router}