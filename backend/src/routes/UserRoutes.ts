import express, {Request,Response,NextFunction} from 'express'
import { CreateUser, GetUserProfile, LoginUser, UpdateUserProfile } from '../controllers';
import { authenticateJwt } from '../middleware/auth';


const router=express.Router();

router.post('/signup',CreateUser)

router.post('/login',LoginUser)

router.use(authenticateJwt)

router.get("/profile",  GetUserProfile);


router.put("/Updateprofile",  UpdateUserProfile);


export {router as UserRoute}