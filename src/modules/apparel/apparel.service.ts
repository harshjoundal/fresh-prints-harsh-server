
import {Injectable} from "@nestjs/common"
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { IapparelSchema } from "./apparel.model";
@Injectable()
export class apparelService {
  constructor(
    @InjectModel('apparel')
    private readonly apparelModel: Model<IapparelSchema>,
  ) {}

  addApparel = async (body) => {
    try {
        let res = await this.apparelModel.create(body);
        return res;
    } catch (error) {
      return error  
    }
  };

  updateApparel = async (body) =>{
      const ProductExist = await this.apparelModel.findById(body?.apparel_id);
      if (!ProductExist) {
        throw new Error('Product not found');
      }

    const product = await this.apparelModel.findOneAndUpdate(
      { _id: body?.apparel_id, 'sizes.size': body?.size },
      {
        $set: {
          'sizes.$.stock_quantity': body?.updateData.stock_quantity,
          'sizes.$.price': body?.updateData.price,
        },
      },
      { new: true }
    );

    return product
  }

  async updateMany (body){

    let apparels = body?.apparels;

    const updateOperations = apparels.map((ele) => {
      return {
        updateOne: {
          filter: { _id: ele?.apparel_id, 'sizes.size': ele?.size },
          update: {
            $set: {
              'sizes.$.stock_quantity': ele?.updateData.stock_quantity,
              'sizes.$.price': ele?.updateData.price,
            },
          },
        },
      };
    });

    // Use updateMany to apply the update operations
    const products = await this.apparelModel.bulkWrite(updateOperations, {});

    return products
  }

  async canFulfillOrder (body) {
    let orders = body?.orders;

    let result = []

    for(let i = 0;i<orders.length;i++){
      let {apparel_id,size,quantity} = orders[i];

      const product = await this.apparelModel.findById(apparel_id);
      if(!product){
        result.push({
          message: `${apparel_id} product is not available!`,
        });
        return `${apparel_id} product is not available!`;
      }

      const isSizeAvailable = product.sizes.find((ele) => ele.size === size);

      if(!isSizeAvailable || isSizeAvailable.stock_quantity < quantity){
        result.push({
          message: `size or required quantity is not available for  ${apparel_id}`,
        });
        return `size or required quantity is not available for apparel  ${apparel_id}`;
      }
    }
    return `Vendor can fulfill the order`;
  }

  async getLowestTotalCost(body){
    let totalCost = 0;

    let orders = body?.orders;

    for(let i = 0;i<orders.length;i++){
      const { apparel_id, size, quantity } = orders[i];

      let product:any = await this.apparelModel.findById(apparel_id);

      if (!product) {
        throw new Error(`Apparel ${apparel_id} not found`);
      }

      const isSizeAvailable = product.sizes.find((ele) => ele.size === size);

      if (!isSizeAvailable || product?.stock_quality < quantity) {
        throw new Error(
          `Not enough stock for apparel ${apparel_id}, size ${size}`,
        );
      }

      totalCost += isSizeAvailable.price * quantity;
    }
    
    return {totalCost : `Rs. ${totalCost}`};
  }
}