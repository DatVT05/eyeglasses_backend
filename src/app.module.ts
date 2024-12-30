import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MemberModule } from './member/member.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from './member/member.entity';
import { ProductModule } from './product/product.module';
import { StaffModule } from './staff/staff.module';
import { PromotionModule } from './promotion/promotion.module';
import { Category } from './category/category.entity';
import { Product } from './product/product.entity';
import { Staff } from './staff/staff.entity';
import { Promotion } from './promotion/promotion.entity';
import { CartModule } from './cart/cart.module';
import { Cart } from './cart/cart.entity';
import { ReceiptModule } from './receipt/receipt.module';
import { Receipt } from './receipt/receiept.entity';
import { ReceiptProduct } from './receiptProduct/receiptProduct.entity';

@Module({
  imports: [
    MemberModule,
    ProductModule,
    StaffModule,
    PromotionModule,
    CartModule,
    ReceiptModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'oracle_4U',
      database: 'store',
      entities: [
        Member,
        Category,
        Product,
        Staff,
        Promotion,
        Cart,
        Receipt,
        ReceiptProduct
      ],
      autoLoadEntities: true,
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
