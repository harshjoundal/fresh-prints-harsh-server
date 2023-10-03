
import {Controller,Post,Body,Res,HttpStatus,Put} from '@nestjs/common'
import { apparelService } from './apparel.service';
import { addApparelDto, canfulFillDto, lowestCostDto, updateApparelDto, updateMultipleDto } from './apparel.dto';
import { ApiBody, ApiTags } from '@nestjs/swagger';

@Controller('/apparel')
@ApiTags('Apparel Controller')
export class apparelController {
  constructor(private readonly apparelService: apparelService) {}

  @Post('/addApparel')
  @ApiBody({ type: addApparelDto })
  async addApparel(@Body() Body: addApparelDto, @Res() res: any) {
    try {
      let result = await this.apparelService.addApparel(Body);
      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: `failed to add apparel for vendor ${Body?.vendor_id}`,
        success: false,
      });
    }
  }

  @Put('/updateApparel')
  @ApiBody({ type: updateApparelDto })
  async updateApparel(@Body() Body, @Res() res) {
    try {
      let result = await this.apparelService.updateApparel(Body);
      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: `failed to update apparel for vendor ${Body?.vendor_id}`,
        success: false,
      });
    }
  }

  @Put('/updateMultiple')
  @ApiBody({ type: updateMultipleDto })
  async updateMultiple(@Body() body, @Res() res) {
    try {
      let result = await this.apparelService.updateMany(body);
      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: `failed to update apparel for vendor ${body?.vendor_id}`,
        success: false,
      });
    }
  }

  @Post('/canFulfill')
  @ApiBody({ type: canfulFillDto })
  async canfulfill(@Body() Body, @Res() res) {
    try {
      let result = await this.apparelService.canFulfillOrder(Body);
      res.status(HttpStatus.OK).json({
        message: result,
      });
    } catch (error) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: `failed to check`,
        success: false,
      });
    }
  }

  @Post('/lowestCost')
  @ApiBody({ type: lowestCostDto})
  async lowestCost(@Body() Body, @Res() res) {
    try {
      let result = await this.apparelService.getLowestTotalCost(Body);
      res.status(HttpStatus.OK).json({ success: true, data: result });
    } catch (error) {
      return res.status(HttpStatus.NOT_ACCEPTABLE).json({
        message: `failed to calculate total order cost`,
        success: false,
      });
    }
  }
}