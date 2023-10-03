import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsArray, ValidateNested } from 'class-validator';


class SizeDto {
  @IsString()
  size: string;

  @IsString()
  stock_quantity: number;

  @IsString()
  price: number;
}

export class addApparelDto {
  @ApiProperty({
    description: 'vendor id',
    example: '651bff3a9e7d58ca746ed95e',
  })
  @IsString()
  @IsNotEmpty()
  readonly vendor_id: String;

  @ApiProperty({
    description: 'Apparel name',
    example: 'Shirt',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: String;

  @ApiProperty({
    description: 'Sizes',
    example: [
        {
            "size":"xl",
            "stock_quantity":100,
            "price":1000
        }
      ]
  })
  @IsArray()
  @ValidateNested({ each: true })
  readonly sizes: SizeDto[];
} 


export class updateApparelDto {
  @ApiProperty({
    description: 'apparel_id',
    example: '651c09877aabc65f2c1b1554',
  })
  @IsString()
  @IsNotEmpty()
  readonly apparel_id: String;

  @ApiProperty({
    description: 'size',
    example: 'xl',
  })
  @IsString()
  @IsNotEmpty()
  readonly size: String;

  @ApiProperty({
    description: 'updateData',
    example: {
      size: 'xl',
      stock_quantity: 500,
      price: 2000,
    },
  })
  @IsString()
  @IsNotEmpty()
  readonly updateData: SizeDto;
}

export class updateMultipleDto {
  @ApiProperty({
    description: 'vendor_id',
    example: '651bff3a9e7d58ca746ed95e',
  })
  @IsString()
  @IsNotEmpty()
  readonly vendor_id: String;

  @ApiProperty({
    description: 'apparels',
    example: [
      {
        apparel_id: '651c09877aabc65f2c1b1554',
        size: 'xl',
        updateData: {
          size: 'xl',
          stock_quantity: 500,
          price: 2000,
        },
      },
      {
        apparel_id: '651c0f3caafcebea8044bb63',
        size: 'xl',
        updateData: {
          size: 'xl',
          stock_quantity: 1000,
          price: 3000,
        },
      },
    ],
  })
  @IsArray()
  readonly apparels: [updateApparelDto];
}

export class canfulFillDto {
  @ApiProperty({
    description: 'orders',
    example: [
      {
        apparel_id: '651c09877aabc65f2c1b1554',
        size: 'xl',
        quantity: '100',
      },
      {
        apparel_id: '651c0f3caafcebea8044bb63',
        size: 'xl',
        quantity: '1000',
      },
      {
        apparel_id: '651c1852b8acfce60bfe4fe8',
        size: 'xl',
        quantity: '100',
      },
    ],
  })
  @IsArray()
  readonly orders: [];
}
export class lowestCostDto {
  @ApiProperty({
    description: 'orders',
    example: [
      {
        apparel_id: '651c09877aabc65f2c1b1554',
        size: 'xl',
        quantity: '100',
      },
      {
        apparel_id: '651c0f3caafcebea8044bb63',
        size: 'xl',
        quantity: '1000',
      },
      {
        apparel_id: '651c1852b8acfce60bfe4fe8',
        size: 'xl',
        quantity: '100',
      },
    ],
  })
  @IsArray()
  readonly orders: [];
}