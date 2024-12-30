import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Product } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ProductDataBody, ProductQuery } from './product.dto';

@Injectable()
export class ProductService {
    private readonly logger = new Logger(ProductService.name);

    constructor(
        @InjectRepository(Product)
        private readonly repository: Repository<Product>
    ) {}

    async getAllProduct(categoryId?: string): Promise<Product[]> {
        try {
            this.logger.log(`Fetching products${categoryId ? ` for categoryId: ${categoryId}` : ''}.`);
            return await this.repository.find({
                where: categoryId ? { category: { id: categoryId } } : {},
                relations: ['category'],
            });
        } catch (error) {
            this.logger.error('Error in getAllProduct:', error);
            throw new InternalServerErrorException('Failed to fetch products');
        }
    }

    async getProduct(query: ProductQuery): Promise<Product> {
        try {
            return await this.repository.findOne({
                where: { id: query.id },
                relations: ['category'],
            });
        } catch (error) {
            this.logger.error(`Error in getProduct for id: ${query.id}`, error);
            throw new InternalServerErrorException('Failed to fetch product');
        }
    }

    async getProductById(id: string): Promise<Product> {
        try {
            return await this.repository.findOne({
                where: { id },
                relations: ['category'],
            });
        } catch (error) {
            this.logger.error(`Error in getProductById for id: ${id}`, error);
            throw new InternalServerErrorException('Failed to fetch product by ID');
        }
    }

    async createProduct(data: ProductDataBody): Promise<Product> {
        try {
            const newProduct = this.repository.create({
                image: data.image,
                name: data.name,
                color: data.color,
                material: data.material,
                quantity: data.quantity,
                price: data.price,
                category: { id: data.categoryId },
            });
            return await this.repository.save(newProduct);
        } catch (error) {
            this.logger.error('Error in createProduct:', error);
            throw new InternalServerErrorException('Failed to create product');
        }
    }

    async updateProduct(query: ProductQuery, data: ProductDataBody): Promise<Product> {
        try {
            const updateData = {
                image: data.image,
                name: data.name,
                color: data.color,
                material: data.material,
                quantity: data.quantity,
                price: data.price,
                category: data.categoryId ? { id: data.categoryId } : undefined,
            };

            await this.repository.update(query.id, updateData);

            return await this.repository.findOne({
                where: { id: query.id },
                relations: ['category'],
            });
        } catch (error) {
            this.logger.error(`Error in updateProduct for id: ${query.id}`, error);
            throw new InternalServerErrorException('Failed to update product');
        }
    }

    async deleteProduct(query: ProductQuery): Promise<DeleteResult> {
        try {
            return await this.repository.delete({ id: query.id });
        } catch (error) {
            this.logger.error(`Error in deleteProduct for id: ${query.id}`, error);
            throw new InternalServerErrorException('Failed to delete product');
        }
    }
}
