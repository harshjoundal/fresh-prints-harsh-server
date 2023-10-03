
import {Schema} from "mongoose"


export const userSchema = new Schema({
    vendor_name : {type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
}) 

export interface IuserModel {
  vendor_name?: string;
  email: string;
  password: string;
}