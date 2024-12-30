import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository } from 'typeorm';
import { Staff } from './staff.entity';
import { StaffQuery, StaffDataBody } from './staff.dto';

@Injectable()
export class StaffService {
    constructor(
        @InjectRepository(Staff)
        private readonly repository: Repository<Staff>,
    ) {}

    async getAllStaff(): Promise<Staff[]> {
        return this.repository.find();
    }

    async getStaff(query: StaffQuery): Promise<Staff> {
        return this.repository.findOne({
            where: {
                id: query.id
            }
        });
    }

    async createStaff(data: StaffDataBody): Promise<Staff> {
        const res = this.repository.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            birth: data.birth,
            gender: data.gender,
            salary: data.salary
        });
        return this.repository.save(res);
    }

    async updateStaff(
        query: StaffQuery,
        data: StaffDataBody
    ): Promise<Staff> {
        const updateData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            birth: data.birth,
            gender: data.gender,
            salary: data.salary
        }
        await this.repository.update(query.id, updateData);

        const res =  this.repository.findOne({
            where: {id: query.id}
        });

        return res;
    }

    async deleteStaff(query: StaffQuery): Promise<DeleteResult> {
        return this.repository.delete({ id: query.id });
    }
}
