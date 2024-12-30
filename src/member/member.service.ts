import { Injectable } from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
import { Member } from './member.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberDataBody, MemberQuery } from './member.dto';

@Injectable()
export class MemberService {
    constructor(
        @InjectRepository(Member)
        private readonly repository: Repository<Member>,
    ) {}

    async getAllMember(): Promise<Member[]> {
        return this.repository.find();
    }

    async getMember(query: MemberQuery): Promise<Member> {
        return this.repository.findOne({
            where: {
                id: query.id
            }
        });
    }

    async createMember(data: MemberDataBody): Promise<Member> {
        const res = this.repository.create({
            name: data.name,
            email: data.email,
            phone: data.phone,
            birth: data.birth,
            gender: data.gender
        });
        return this.repository.save(res);
    }

    async updateMember(
        query: MemberQuery,
        data: MemberDataBody
    ): Promise<Member> {
        const updateData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            birth: data.birth,
            gender: data.gender
        }
        await this.repository.update(query.id, updateData);

        const res =  this.repository.findOne({
            where: {id: query.id}
        });

        return res;
    }

    async deleteMember(query: MemberQuery): Promise<DeleteResult> {
        return this.repository.delete({ id: query.id });
    }
}
