import { PickType } from "@nestjs/mapped-types";
import { IsDate, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";

export class Staff{
    @IsUUID()
    @IsString()
    id: string;

    @IsString()
    name: string;

    @IsString()
    email: string;

    @IsString()
    phone: string;

    @IsDate()
    @IsString()
    birth?: Date;

    @IsString()
    @IsOptional()
    gender?: string;

    @IsDate()
    @IsString()
    startDate?: Date;

    @IsNumber()
    salary: number;
}

export class StaffDataBody extends PickType(Staff, [
    'name',
    'email',
    'phone',
    'birth',
    'gender',
    'salary'
] as const) {}

export class StaffQuery extends PickType(Staff, [
    'id'
] as const){}