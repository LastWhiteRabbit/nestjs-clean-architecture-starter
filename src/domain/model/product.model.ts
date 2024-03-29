export class ProductModel {
  id?: number;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
  createDate: Date;
  updatedDate: Date;
}

export class ProductUpdateModel {
  id: number;
  name: string;
  shortName: string;
  description: string;
  shortDescription: string;
}
