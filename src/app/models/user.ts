import mongoose, { model, models } from "mongoose";
import bcrypt from "bcryptjs";

export interface User{
    email: string,
    password: string,
    _id?: mongoose.Types.ObjectId,
    createdAt?: Date,
    updatedAt?: Date
}

const userSchema = new mongoose.Schema<User>({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    }
},{
    timestamps: true
})

userSchema.pre("save",async function(next){
 if(this.isModified("passowrd")){
    this.password = await bcrypt.hash(this.password, 10);
    next();
 }
})
const userModel = models?.userModel || model<User>('User', userSchema);
export default userModel;