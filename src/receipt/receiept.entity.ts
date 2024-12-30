import { Member } from "src/member/member.entity";
import { Product } from "src/product/product.entity";
import { Promotion } from "src/promotion/promotion.entity";
import { ReceiptProduct } from "src/receiptProduct/receiptProduct.entity";
import { Staff } from "src/staff/staff.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, CreateDateColumn  } from "typeorm";

@Entity('receipt')
export class Receipt {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  memberId: string;

  @Column()
  staffId: string;

  @Column()
  promotionId: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  city: string;

  @Column()
  district: string;

  @Column()
  ward: string;

  @Column()
  address: string;

  @Column({ type: 'numeric' })
  totalprice: number;

  @CreateDateColumn({ type: 'timestamp' }) 
  date: Date;

  @Column({ nullable: true })
  note: string;

  @ManyToOne(() => Member, (member) => member.receipt)
  @JoinColumn({ name: 'memberId' })
  member: Member;

  @ManyToOne(() => Staff, (staff) => staff.receipt)
  @JoinColumn({ name: 'staffId' })
  staff: Staff;

  @OneToMany(() => ReceiptProduct, (receiptProduct) => receiptProduct.receipt)
  receiptProducts: ReceiptProduct[];

  @OneToOne(() => Promotion, (promotion) => promotion.receipt)
  @JoinColumn({ name: 'promotionId' })
  promotion: Promotion;
}