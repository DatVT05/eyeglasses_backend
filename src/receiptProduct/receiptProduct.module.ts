import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReceiptProduct } from './receiptProduct.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ReceiptProduct]), 
  ]
})
export class ReceiptProductModule {}
