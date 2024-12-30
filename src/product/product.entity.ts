import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Cart } from 'src/cart/cart.entity';
import { ReceiptProduct } from 'src/receiptProduct/receiptProduct.entity';
import { Category } from 'src/category/category.entity';

@Entity('product')
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  image: string;

  @Column()
  name: string;

  @Column()
  price: number;

  @Column({ nullable: true })
  brand: string;

  @Column()
  origin: string;

  @Column()
  color: string;

  @Column()
  material: string;

  @Column()
  quantity: number;
  
  @Column('simple-array', { nullable: true })
  thumbnails: string[];

  @ManyToOne(() => Category, (category) => category.products, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @OneToMany(() => Cart, (cart) => cart.member)
  cart: Cart[];

  @OneToMany(() => ReceiptProduct, (receiptProduct) => receiptProduct.productId)
  receiptProducts: ReceiptProduct[];
}
