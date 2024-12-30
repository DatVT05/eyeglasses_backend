import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class Cart{
    @IsUUID()
    @IsString()
    id: string;

    @IsUUID()
    @IsString()
    @IsOptional()
    memberId?: string;

    @IsUUID()
    @IsString()
    productId: string;

    @IsString()
    name: string;

    @IsNumber()
    quantity: number;

    @IsNumber()
    price: number;
}

export class CartDataBody extends PickType(Cart, [
    'memberId',
    'productId',
    'name',
    'quantity',
    'price'
] as const) {}

export class CartQuery extends PickType(Cart, [
    'id'
] as const){}