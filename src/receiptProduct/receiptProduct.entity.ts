import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Receipt } from 'src/receipt/receiept.entity';

@Entity('receiptproduct')
export class ReceiptProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  receiptId: string;

  @Column()
  productId: string;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Receipt, (receipt) => receipt.receiptProducts)
  @JoinColumn({ name: 'receiptId' })
  receipt: Receipt;
}
