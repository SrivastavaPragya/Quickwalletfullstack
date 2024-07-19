import {Request,Response,NextFunction} from 'express'
import { AccountTransfer, UserInput, UserLogin } from '../dto'
import { Account, User } from '../models'
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from 'jsonwebtoken'
import mongoose from 'mongoose'
const SECRET = "SECr3mm";







  export const GetUserBalance = async (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    try {
        if (!req.user) {
            return res.status(404).json({ message: "User does not exist" });
        }

        const UserId = req.user.id;

       
        const account = await Account.findOne({ userId: UserId });

        if (account) {
            res.json({ balance: account.balance });
        } else {
           
            res.status(404).json({ message: "Account not found" });
        }
    } catch (error) {
        console.error("Error retrieving user balance:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};



// Check User Authentication:
// The function starts by checking if there is a user identified in the request. This is usually set by some prior middleware that decodes a JWT (JSON Web Token) and attaches the user's data to the request.
// If there is no user data (req.user), the function immediately responds with a status code of 404 (Not Found) and a message saying "User does not exist." This stops the function because there's no point in looking for an account if we don't know who the user is.
// Get User ID:
// Once it's confirmed that there is a user, the function extracts the user's ID from req.user.id. This ID is what links the user to their account in the database.
// Find the Account:
// The function then looks in the database for an account that matches this user ID. It uses Account.findOne({ userId: UserId }) to search. This means "find one account where the userId field is equal to the user's ID we have."
// This is different from using findById, which looks for a document by its MongoDB _id value. Since userId is not the same as the _id of the account, you must specifically tell MongoDB to look for userId.
// Respond with the Balance:
// If an account is found, the function sends back the balance of this account to the user. This is done with res.json({ balance: account.balance }), which sends a JSON response containing the balance.
// If no account is found (i.e., the account document with the specified userId does not exist), it responds with a 404 status code and a message "Account not found." This lets the user know that there was no account information available for them.

    
    export const TranferMoney = async (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
        if (!req.user) {
            return res.status(401).json({ message: "Unauthorized access" });
        }
    
        const { amount, to } =<AccountTransfer> req.body  ;
        if (amount <= 0) {
            return res.status(400).json({ message: "Amount must be greater than zero" });
        }
    
        const session = await mongoose.startSession();
        session.startTransaction();
    
        try {
            const senderId = req.user.id;
            const senderAccount = await Account.findOne({ userId: senderId }).session(session);
            if (!senderAccount || senderAccount.balance < amount) {
                await session.abortTransaction();
                session.endSession();
                return res.status(400).json({ message: "Insufficient balance" });
            }
    
            const recipientAccount = await Account.findOne({ userId: to }).session(session);
            if (!recipientAccount) {
                await session.abortTransaction();
                session.endSession();
                return res.status(404).json({ message: "Recipient account not found" });
            }
    
            // Perform the transactions
            await Account.updateOne({ userId: senderId }, { $inc: { balance: -amount } }).session(session);
            await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);
    
            // Commit the transaction
            await session.commitTransaction();
            session.endSession();
            res.json({ message: "Transfer successful" });
        } catch (error) {
            console.error("Transfer error:", error);
            await session.abortTransaction();
            session.endSession();
            res.status(500).json({ message: "Internal server error" });
        }
    };
  