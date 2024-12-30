import { Receipt } from 'src/receipt/receiept.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('staff')
export class Staff {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  phone: string;

  @Column({ type: 'date', nullable: true })
  birth: Date;

  @Column({ nullable: true })
  gender: string;

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column()
  salary: number;

  @OneToMany(() => Receipt, (receipt) => receipt.member)
  receipt: Receipt[]
}