import { PickType } from "@nestjs/mapped-types";
import { IsDate, IsString, IsUUID } from "class-validator";

export class Promotion{
    @IsUUID()
    @IsString()
    id: string;

    @IsString()
    item: string;

    @IsDate()
    startDate: Date;

    @IsDate()
    endDate: Date;
}

export class PromotionDataBody extends PickType(Promotion, [
    'item',
    'startDate',
    'endDate'
] as const) {}

export class PromotionQuery extends PickType(Promotion, [
    'id'
] as const){}