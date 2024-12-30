import { PickType } from "@nestjs/mapped-types";
import { IsDate, IsOptional, IsString, IsUUID } from "class-validator";

export class Member{
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
}

export class MemberDataBody extends PickType(Member, [
    'name',
    'email',
    'phone',
    'birth',
    'gender'
] as const) {}

export class MemberQuery extends PickType(Member, [
    'id'
] as const){}
