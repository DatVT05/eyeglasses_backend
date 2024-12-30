import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PromotionQuery, PromotionDataBody } from './promotion.dto';
import { Promotion } from './promotion.entity';
import { Repository, DeleteResult } from 'typeorm';

@Injectable()
export class PromotionService {
    constructor(
        @InjectRepository(Promotion)
        private readonly repository: Repository<Promotion>,
    ) {}

    async getAllPromotion(): Promise<Promotion[]> {
        return this.repository.find();
    }

    async getPromotion(query: PromotionQuery): Promise<Promotion> {
        return this.repository.findOne({
            where: {
                id: query.id
            }
        });
    }

    async createPromotion(data: PromotionDataBody): Promise<Promotion> {
        const res = this.repository.create({
            item: data.item,
            startDate: data.startDate,
            endDate:data.endDate
        });
        return this.repository.save(res);
    }

    async updatePromotion(
        query: PromotionQuery,
        data: PromotionDataBody
    ): Promise<Promotion> {
        const updateData = {
            item: data.item,
            startDate: data.startDate,
            endDate:data.endDate
        }
        await this.repository.update(query.id, updateData);

        const res =  this.repository.findOne({
            where: {id: query.id}
        });

        return res;
    }

    async deletePromotion(query: PromotionQuery): Promise<DeleteResult> {
        return this.repository.delete({ id: query.id });
    }
}
