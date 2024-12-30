import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Cart } from './cart.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CartQuery, CartDataBody } from './cart.dto';

@Injectable()
export class CartService {
    constructor(
        @InjectRepository(Cart)
        private readonly repository: Repository<Cart>,
    ) {}

    async getAllCart(): Promise<Cart[]> {
        return this.repository.find();
    }

    async getCart(query: CartQuery): Promise<Cart> {
        const cart = await this.repository.findOne({
            where: {
                id: query.id,
            },
        });

        if (!cart) {
            throw new NotFoundException('Cart item not found');
        }

        return cart;
    }

    async createCart(data: CartDataBody): Promise<Cart> {
        const existingCartItem = await this.repository.findOne({
            where: { productId: data.productId },
        });

        if (existingCartItem) {
            existingCartItem.quantity += data.quantity;
            return this.repository.save(existingCartItem);
        }
        const newCartItem = this.repository.create({
            memberId: data?.memberId,
            productId: data.productId,
            name: data.name,
            price: data.price,
            quantity: data.quantity,
        });

        return this.repository.save(newCartItem);
    }

    async updateCart(query: CartQuery, data: CartDataBody): Promise<Cart> {
        const cartItem = await this.repository.findOne({
            where: { id: query.id },
        });

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }
        cartItem.quantity = data.quantity ?? cartItem.quantity;
        cartItem.name = data.name ?? cartItem.name;
        cartItem.price = data.price ?? cartItem.price;

        return this.repository.save(cartItem);
    }

    async deleteCart(query: CartQuery): Promise<DeleteResult> {
        const cartItem = await this.repository.findOne({
            where: { id: query.id },
        });

        if (!cartItem) {
            throw new NotFoundException('Cart item not found');
        }
        return this.repository.delete({ id: query.id });
    }
}
