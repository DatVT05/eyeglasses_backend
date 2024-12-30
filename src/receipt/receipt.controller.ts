import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { Receipt } from './receiept.entity';
import { ReceiptQuery, ReceiptDataBody } from './receipt.dto';
import { ReceiptService } from './receipt.service';
import { DeleteResult } from 'typeorm';

@Controller('receipt')
export class ReceiptController {
  constructor(private readonly service: ReceiptService) {}

  @Get('getAllReceipts') 
  async getAllReceipts(): Promise<Receipt[]> {
    return this.service.getAllRecipt();
  }

  @Get('getReceipt') 
  async getReceipt(
    @Query() query: ReceiptQuery, 
  ): Promise<Receipt> {
    return this.service.getRecipt(query.id); 
  }

  @Post('createReceipt') 
  async createReceipt(
    @Body() data: ReceiptDataBody,
  ): Promise<Receipt> {
    return this.service.createReceipt(data);
  }
  
  @Delete('deleteReceipt') 
  async deleteReceipt(
    @Query('id') id: string,
  ): Promise<DeleteResult> {
    return this.service.deleteRecipt(id);
  }
}
