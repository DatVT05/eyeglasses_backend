import { PickType } from "@nestjs/mapped-types";
import { IsNumber, IsUUID, IsString, IsArray, IsDate, ValidateNested } from "class-validator";
import { Type } from "class-transformer";

export class Receipt {
    @IsUUID()
    @IsString()
    id: string;
  
    @IsUUID()
    @IsString()
    memberId: string;
  
    @IsUUID()
    @IsString()
    staffId: string;
  
    @IsUUID()
    @IsString()
    promotionId: string;
  
    @IsString()
    name: string;

    @IsString()
    phone: string;

    @IsString()
    email: string;
  
    @IsString()
    city: string;
  
    @IsString()
    district: string;
  
    @IsString()
    ward: string;
  
    @IsString()
    address: string;
  
    @IsNumber()
    totalprice: number;
  
    @IsDate()
    date: Date;

    @IsString()
    note: string;
  }
  
  export class ReceiptItem {
    @IsUUID()
    @IsString()
    productId: string;
  
    @IsNumber()
    quantity: number;
  
    @IsNumber()
    price: number;
  }
  
  export class ReceiptDataBody extends PickType(Receipt, [
    'memberId',
    'staffId',
    'promotionId',
    'name',
    'phone',
    'email',
    'city',
    'district',
    'ward',
    'address',
    'totalprice',
    'date',
    'note',
  ] as const) {
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ReceiptItem)
    items: ReceiptItem[];
  }
  
  export class ReceiptQuery extends PickType(Receipt, ['id'] as const) {}
