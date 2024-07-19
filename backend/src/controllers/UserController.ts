import {Request,Response,NextFunction} from 'express'
import { UserInput, UserLogin } from '../dto'
import { Account, User } from '../models'
import bcrypt from "bcryptjs"
import jwt, { JwtPayload } from 'jsonwebtoken'
const SECRET = "SECr3mm";



export const CreateUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { Firstname, Lastname, email, password, phone } = <UserInput>req.body;
  
      // Check if necessary fields are provided
      if (!Firstname || !Lastname || !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }
  
      const ExistingUser = await User.findOne({ email });
  
      if (ExistingUser !== null) {
        return res.status(403).json({ message: "User already exists" });
      } else {
        const newUser = new User({ Firstname, Lastname, email, password, phone });
       
        await newUser.save();

        const UserId=newUser._id;
        
        const NewAccount=new Account({
          userId: UserId,
          balance: 1 + Math.random() * 10000
        })
        await NewAccount.save()
        res.status(200).json({ message: "Signup successful!" });
      }
    } catch (error) {
      console.error("Signup error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  



export const LoginUser =async(req:Request,res:Response,next:NextFunction)=>{
try{

    const {email,password}=<UserLogin>req.body
    if ( !email || !password) {
        return res.status(400).json({ message: "Missing required fields" });
      }

      const user= await User.findOne({email});

      if(!user){
        return res.status(403).json({ message: "Invalid email or password" });
      }


      const isMatch= await bcrypt.compare(password,user.password)


      if(isMatch){
        const token = jwt.sign({ id: user._id, email: user.email }, SECRET, {
            expiresIn: "1h",
          });
          res.status(200).json({ message: "User logged in successfully", token });
      }

      else {
        res.status(403).json({ message: "Invalid email or password" });
      }

}catch(error){
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
}
}



export const GetUserProfile =async(req:Request&{user?:JwtPayload},res:Response,next:NextFunction)=>{
try{
    if(!req.user){
        return res.status(404).json({message:"user does not exsists"})
    }

    const UserId=req.user.id;

    const user=await User.findById(UserId)

    if(user){
        res.json(user);
    }

}catch(error){
    res.status(500).send({ error: "Internal server error" });
}
}



export const UpdateUserProfile = async (req: Request & { user?: JwtPayload }, res: Response, next: NextFunction) => {
    if(!req.user){
        return res.status(401).json({ message: "'Unauthorized'" });
      }

      const UserId=req.user.id;
      const updates=req.body;
    try {
       
        const user = await User.findByIdAndUpdate(UserId, updates, { new: true });
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        res.json(user);

    } catch (error) {
        console.error("Update profile error:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};