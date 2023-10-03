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
  @IsString()
  @IsNotEmpty()
  readonly vendor_id: String;

  @IsString()
  @IsNotEmpty()
  readonly name: String;

  @IsArray()
  @ValidateNested({ each: true })
  readonly sizes: SizeDto[]
} 
