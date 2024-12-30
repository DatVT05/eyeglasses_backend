import { Receipt } from 'src/receipt/receiept.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';

@Entity('promotion')
export class Promotion {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  item: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @OneToOne(() => Receipt, (receipt) => receipt.promotion)
  receipt: Receipt
}