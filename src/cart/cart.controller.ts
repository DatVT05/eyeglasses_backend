import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { CartQuery, CartDataBody } from './cart.dto';
import { Cart } from './cart.entity';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(private readonly service: CartService) {}
    
    @Get("getAllCart")
    async getAllCart(): Promise<Cart[]> {
        return this.service.getAllCart();
    }

    @Get("getCart")
    async getCart(
        @Query() query: CartQuery
    ): Promise<Cart> {
        return this.service.getCart(query);
    }

    @Post('createCart')
    async createCart(
        @Body() data: CartDataBody
    ): Promise<Cart> {
        return this.service.createCart(data);
    }

    @Put('updateCart')
    async updateCart(
        @Query() query: CartQuery,
        @Body() data: CartDataBody
    ): Promise<Cart> {
        return this.service.updateCart(query, data);
    }

    @Delete("deleteCart")
    async deleteCart(@Query() query: CartQuery) {
        return this.service.deleteCart(query);
    }
}
