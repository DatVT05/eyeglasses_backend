import { Cart } from 'src/cart/cart.entity';
import { Receipt } from 'src/receipt/receiept.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity('member')
export class Member {
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

  @OneToMany(() => Cart, (cart) => cart.member, {cascade: true})
  cart: Cart[];

  @OneToMany(() => Receipt, (receipt) => receipt.member)
  receipt: Receipt[]
}