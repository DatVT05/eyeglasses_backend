import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberDataBody, MemberQuery } from './member.dto';
import { Member } from './member.entity';

@Controller('member')
export class MemberController {
    constructor(private readonly service: MemberService) {}

    @Get("getAllMember")
    async getAllMember(): Promise<Member[]> {
        return this.service.getAllMember();
    }

    @Get("getMember")
    async getMember(
        @Query() query: MemberQuery
    ): Promise<Member> {
        return this.service.getMember(query);
    }

    @Post('createMember')
    async createMember(
        @Body() data: MemberDataBody
    ): Promise<Member> {
        return this.service.createMember(data);
    }

    @Put('updateMember')
    async updateMember(
        @Query() query: MemberQuery,
        @Body() data: MemberDataBody
    ): Promise<Member> {
        return this.service.updateMember(query, data);
    }

    @Delete("deleteMember")
    async deleteMember(@Query() query: MemberQuery) {
        return this.service.deleteMember(query);
    }
}
