import { Module } from '@nestjs/common';
import { ReceiptController } from './receipt.controller';
import { ReceiptService } from './receipt.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Receipt } from './receiept.entity';
import { ReceiptProduct } from 'src/receiptProduct/receiptProduct.entity';
import { Staff } from 'src/staff/staff.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Receipt, ReceiptProduct, Staff])],
  controllers: [ReceiptController],
  providers: [ReceiptService],
  exports: [ReceiptService],
})
export class ReceiptModule {}
