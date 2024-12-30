import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsString, IsUUID } from "class-validator";

export class Product {
    @IsUUID()
    @IsString()
    id: string;

    @IsString()
    image: string;

    @IsString()
    name: string;

    @IsNumber()
    price: number;

    @IsString()
    brand: string;

    @IsString()
    origin: string;

    @IsString()
    color: string;

    @IsString()
    material: string;

    @IsNumber()
    quantity: number;
}

export class ProductDataBody extends PickType(Product, [
    'image',
    'name',
    'price',
    'brand',
    'origin',
    'color',
    'material',
    'quantity'
] as const) {
    @IsUUID()
    categoryId: string;
}

export class ProductQuery extends PickType(Product, [
    'id'
] as const) {}