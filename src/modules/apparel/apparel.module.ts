import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { apparelSchema } from "./apparel.model";
import { apparelService } from "./apparel.service";
import { apparelController } from "./apparel.controller";



@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'apparel', schema: apparelSchema }]),
  ],
  controllers: [apparelController],
  providers: [apparelService],
})
export class apparelModule {}