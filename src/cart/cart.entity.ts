
import { Member } from "src/member/member.entity";
import { Product } from "src/product/product.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity('cart')
export class Cart{
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({nullable: true})
    memberId: string;

    @Column()
    productId: string;

    @Column()
    name: string;

    @Column()
    quantity: number;

    @Column()
    price: number;

    @ManyToOne(() => Member, (member) => member.cart)
    @JoinColumn({name: "memberId"})
    member: Member;

    @ManyToOne(() => Product, (product) => product.cart)
    @JoinColumn({ name: 'productId'})
    product: Product
}