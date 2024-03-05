import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsDate } from 'class-validator';

export class AddProductDto {
  @ApiProperty({ required: true })
  @IsNotEmpty()
  @IsString()
  readonly id: number;

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
