import { BadRequestException, Body, Controller, Delete, Get, InternalServerErrorException, NotFoundException, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductQuery, ProductDataBody } from './product.dto';
import { Product } from './product.entity';
@Controller('product')
export class ProductController {
  constructor(private readonly service: ProductService) {}

  @Get('getAllProduct')
  async getAllProduct(@Query('categoryId') categoryId?: string): Promise<Product[]> {
    try {
      console.log('Received categoryId:', categoryId);
      const products = await this.service.getAllProduct(categoryId);
      if (!products || products.length === 0) {
        throw new NotFoundException('No products found');
      }
      return products;
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new InternalServerErrorException('Failed to fetch products');
    }
  }

  @Get('getProduct/:id')
  async getProduct(
    @Param('id') id: string
  ): Promise<Product> {
    console.log('Received ID:', id);
    if (!id) {
      throw new BadRequestException('Product ID is required');
    }

    try {
      const product = await this.service.getProductById(id);
      if (!product) {
        throw new NotFoundException('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new InternalServerErrorException('An error occurred while fetching the product');
    }
  }

  @Post('createProduct')
  async createProduct(@Body() data: ProductDataBody): Promise<Product> {
    return this.service.createProduct(data);
  }

  @Put('updateProduct')
  async updateProduct(@Query() query: ProductQuery, @Body() data: ProductDataBody): Promise<Product> {
    return this.service.updateProduct(query, data);
  }

  @Delete('deleteProduct')
  async deleteProduct(@Query() query: ProductQuery) {
    return this.service.deleteProduct(query);
  }
}
