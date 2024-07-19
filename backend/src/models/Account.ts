import mongoose,{Schema,Document} from 'mongoose';

interface AccountDoc extends Document{
    userId: mongoose.Types.ObjectId;
    balance: number;
}


const AccountSchema=new Schema({
    userId:{
        type: Schema.Types.ObjectId,
        ref: "User", 
        required: true,
    },

    balance:{
type:Number,
default:0,
required:true

    }
})


const Account=mongoose.model<AccountDoc>('Account',AccountSchema)

export {Account}