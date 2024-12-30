import { Body, Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { PromotionService } from './promotion.service';
import { Promotion, PromotionDataBody, PromotionQuery } from './promotion.dto';

@Controller('promotion')
export class PromotionController {
    constructor(private readonly service: PromotionService) {}
    
    @Get("getAllPromotion")
    async getAllPromotion(): Promise<Promotion[]> {
        return this.service.getAllPromotion();
    }

    @Get("getPromotion")
    async getPromotion(
        @Query() query: PromotionQuery
    ): Promise<Promotion> {
        return this.service.getPromotion(query);
    }

    @Post('createPromotion')
    async createPromotion(
        @Body() data: PromotionDataBody
    ): Promise<Promotion> {
        return this.service.createPromotion(data);
    }

    @Put('updatePromotion')
    async updatePromotion(
        @Query() query: PromotionQuery,
        @Body() data: PromotionDataBody
    ): Promise<Promotion> {
        return this.service.updatePromotion(query, data);
    }

    @Delete("deletePromotion")
    async deletePromotion(@Query() query: PromotionQuery) {
        return this.service.deletePromotion(query);
    }
}
