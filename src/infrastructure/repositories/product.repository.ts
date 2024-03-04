import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductModel } from '../../domain/model/product.model';
import { IProductService } from '../../domain/interfaces/IProductService.interface';
import { Product } from '../entities/product.entity';

@Injectable()
export class DatabaseProductRepository implements IProductService {
    constructor(
        @InjectRepository(Product)
        private readonly productEntityRepository: Repository<Product>,
    ) { }

    async updateContent(id: number): Promise<void> {
        await this.productEntityRepository.update(
            {
                id: id,
            },
            {} // Add an empty object as the second argument
        );
    }
    async insert(product: ProductModel): Promise<ProductModel> {
        const productEntity = this.productEntity(product);
        const result = await this.productEntityRepository.insert(productEntity);
        return this.toProductModel(result.generatedMaps[0] as Product);
    }

    async findAll(): Promise<ProductModel[]> {
        const productEntity = await this.productEntityRepository.find();
        return productEntity.map((productEntity) => this.toProductModel(productEntity));
    }
    async findById(id: number): Promise<ProductModel> {
        const productEntity = await this.productEntityRepository.findOneOrFail({where: { id: id }});
        return this.toProductModel(productEntity);
    }
    async deleteById(id: number): Promise<void> {
        await this.productEntityRepository.delete({ id: id });
    }

    private toProductModel(productEntity: Product): ProductModel {
        const product: ProductModel = new ProductModel();

        product.id = productEntity.id;
        product.name = productEntity.name;
        product.shortName = productEntity.shortName;
        product.description = productEntity.description;
        product.shortDescription = productEntity.shortDescription;
        product.createDate = productEntity.createDate;
        product.updatedDate = productEntity.updatedDate;

        return product;
    }

    private productEntity(product: ProductModel): Product {
        const productEntity: Product = new Product();

        productEntity.id = product.id;
        productEntity.name = product.name;
        productEntity.shortName = product.shortName;
        productEntity.description = product.description;
        productEntity.shortDescription = product.shortDescription;
        productEntity.createDate = product.createDate;
        productEntity.updatedDate = product.updatedDate;

        return productEntity;
    }
}