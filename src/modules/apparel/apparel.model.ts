import { Schema } from "mongoose";

const sizeSchema = new Schema({
  size: { type: String, required: true },
  stock_quantity: { type: Number, required: true },
  price: { type: Number, required: true },
},{ _id : false });

export const apparelSchema = new Schema({
  vendor_id: { type: String, required: true },
  name: { type: String, required: true },
  sizes: {type:[sizeSchema],required:true}
});

interface size {
  size: string;
  stock_quantity: number;
  price: number;
}

export interface IapparelSchema {
  vendor_id: string;
  name: string;
  sizes: Array<size>;
}