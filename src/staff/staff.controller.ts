import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffQuery, StaffDataBody } from './staff.dto';
import { Staff } from './staff.entity';

@Controller('staff')
export class StaffController {
    constructor(private readonly service: StaffService) {}

    @Get("getAllStaff")
    async getAllStaff(): Promise<Staff[]> {
        return this.service.getAllStaff();
    }

    @Get("getStaff")
    async getStaff(
        @Query() query: StaffQuery
    ): Promise<Staff> {
        return this.service.getStaff(query);
    }

    @Post('createStaff')
    async createStaff(
        @Body() data: StaffDataBody
    ): Promise<Staff> {
        return this.service.createStaff(data);
    }

    @Put('updateStaff')
    async updateStaff(
        @Query() query: StaffQuery,
        @Body() data: StaffDataBody
    ): Promise<Staff> {
        return this.service.updateStaff(query, data);
    }

    @Delete("deleteStaff")
    async deleteStaff(@Query() query: StaffQuery) {
        return this.service.deleteStaff(query);
    }
}
