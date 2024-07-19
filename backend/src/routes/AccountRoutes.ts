import express from "express";
import { authenticateJwt } from '../middleware/auth';
import { GetUserBalance, TranferMoney } from "../controllers/Accountcontroller";

const router = express.Router();



router.use(authenticateJwt)

//get user's balance
router.get("/balance",  GetUserBalance);

//user transfer money to another user
router.post("/transfer",  TranferMoney);

export { router as AccountRoute };