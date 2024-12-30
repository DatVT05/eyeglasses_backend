import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { Receipt } from './receiept.entity';
import { ReceiptProduct } from 'src/receiptProduct/receiptProduct.entity'; 
import { ReceiptDataBody } from './receipt.dto';
import { Staff } from 'src/staff/staff.entity';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ReceiptService {
    constructor(
        @InjectRepository(Receipt)
        private readonly receiptRepository: Repository<Receipt>, 

        @InjectRepository(ReceiptProduct) 
        private readonly receiptProductRepository: Repository<ReceiptProduct>,

        @InjectRepository(Staff)
        private readonly staffRepository: Repository<Staff>, 
    ) {}

    async getAllRecipt(): Promise<Receipt[]> {
        return this.receiptRepository.find();
    }

    async getRecipt(id: string): Promise<Receipt> {
        return this.receiptRepository.findOne({ where: { id } });
    }

    private async getRandomStaffId(): Promise<string> {
        const staffs = await this.staffRepository.find();
        if (staffs.length === 0) {
            throw new Error('No staff available in the database');
        }
        const randomIndex = Math.floor(Math.random() * staffs.length);
        return staffs[randomIndex].id; 
    }

    async createReceipt(data: ReceiptDataBody): Promise<Receipt> {
        try {
            const memberId = data.memberId || uuidv4();

            const staffId = data.staffId || await this.getRandomStaffId();

            const receipt = this.receiptRepository.create({
                memberId,
                staffId, 
                promotionId: data.promotionId,
                name: data.name,
                phone: data.phone,
                city: data.city,
                district: data.district,
                ward: data.ward,
                address: data.address,
                note: data.note,
                totalprice: data.totalprice,
                date: data.date,
            });

            const savedReceipt = await this.receiptRepository.save(receipt);
            console.log("Receipt saved:", savedReceipt);

            const receiptProducts = data.items.map((item) => ({
                receiptId: savedReceipt.id,
                productId: item.productId,
                quantity: item.quantity,
                price: item.price,
            }));
            await this.receiptProductRepository.save(receiptProducts);
            console.log("Receipt products saved:", receiptProducts);

            return savedReceipt;
        } catch (error) {
            console.error("Error creating receipt:", error.message);
            throw new Error("Failed to create receipt");
        }
    }

    async deleteRecipt(id: string): Promise<DeleteResult> {
        return this.receiptRepository.delete({ id });
    }
}
