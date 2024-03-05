import { ApiProperty } from '@nestjs/swagger';
import { ProductModel } from 'src/domain/model/product.model';

export class ProductPresenter {
  @ApiProperty()
  id: number;
  @ApiProperty()
  name: string;
  @ApiProperty()
  shortName: string;
  @ApiProperty()
  description: string;
  @ApiProperty()
  shortDescription: string;
  @ApiProperty()
  createdate: Date;
  @ApiProperty()
  updateddate: Date;

  constructor(product: ProductModel) {
    this.id = product.id;
    this.name = product.name;
    this.shortName = product.shortName;
    this.description = product.description;
    this.shortDescription = product.shortDescription;
    this.createdate = product.createDate;
    this.updateddate = product.updatedDate;
  }
}
