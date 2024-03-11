import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate, IsNumber } from 'class-validator';

export class AddProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly shortName: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly shortDescription: string;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly createDate: Date;

  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsDate()
  readonly updatedDate: Date;
}

export class UpdateProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsNumber()
  readonly id: number;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  readonly name: string;

  @ApiProperty({ required: false })
  @IsNotEmpty()
  @IsString()
  readonly shortName: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly description: string;

  @ApiProperty({ required: false })
  @IsString()
  readonly shortDescription: string;
}
