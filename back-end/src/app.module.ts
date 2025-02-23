import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { SendEmailModule } from './modules/send-email/send-email.module';
import { AuthMiddleware } from './middleware/auth/auth.middleware';
import { PrismaService } from './prisma.service';
import { AuthService } from './modules/auth/auth.service';
import { UploadModule } from './modules/upload/upload.module';
import { AddressModule } from './modules/address/address.module';
import { CategoryModule } from './modules/category/category.module';
import { SubCategoryModule } from './modules/sub-category/sub-category.module';
import { AttributesModule } from './modules/attributes/attributes.module';
import { ShopModule } from './modules/shop/shop.module';
import { ProductsModule } from './modules/products/products.module';
import { ShopFollowerModule } from './modules/shop-follower/shop-follower.module';
import { CartModule } from './modules/cart/cart.module';
import { OrderModule } from './modules/order/order.module';
import { ReviewModule } from './modules/review/review.module';
import { PaymentModule } from './modules/payment/payment.module';
import { StatisticsModule } from './modules/statistics/statistics.module';
import { ShopStatisticsModule } from './modules/shop-statistics/shop-statistics.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    SendEmailModule,
    UploadModule,
    AddressModule,
    CategoryModule,
    SubCategoryModule,
    AttributesModule,
    ShopModule,
    ProductsModule,
    ShopFollowerModule,
    CartModule,
    OrderModule,
    ReviewModule,
    PaymentModule,
    StatisticsModule,
    ShopStatisticsModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, AuthService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        // Loại trừ các routes callback khỏi middleware
        { path: '/auth/social/google/callback', method: RequestMethod.GET },
        { path: '/auth/social/facebook/callback', method: RequestMethod.GET },
        { path: '/auth/social/github/callback', method: RequestMethod.GET },
      )
      .forRoutes(
        {
          path: 'auth/profile',
          method: RequestMethod.GET,
        },
        {
          path: 'auth/logout',
          method: RequestMethod.POST,
        },
        {
          path: 'upload/image',
          method: RequestMethod.POST,
        },
        {
          path: 'users/update/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'users',
          method: RequestMethod.GET,
        },
        {
          path: 'address/create',
          method: RequestMethod.POST,
        },
        {
          path: 'address',
          method: RequestMethod.GET,
        },
        {
          path: 'address/:id',
          method: RequestMethod.GET,
        },
        {
          path: 'address/:id',
          method: RequestMethod.PATCH,
        },
        // category
        {
          path: 'category',
          method: RequestMethod.POST,
        },
        {
          path: 'category/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'category/:id',
          method: RequestMethod.DELETE,
        },
        // sub-category
        {
          path: 'sub-category',
          method: RequestMethod.POST,
        },
        {
          path: 'sub-category/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'sub-category/:id',
          method: RequestMethod.DELETE,
        },
        // attributes
        {
          path: 'attributes',
          method: RequestMethod.POST,
        },
        {
          path: 'attributes/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'attributes/:id',
          method: RequestMethod.DELETE,
        },
        //shop
        {
          path: 'shop',
          method: RequestMethod.POST,
        },
        {
          path: 'shop',
          method: RequestMethod.GET,
        },
        // {
        //   path: 'shop/:id',
        //   method: RequestMethod.GET,
        // },
        {
          path: 'shop/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'shop/:id/active',
          method: RequestMethod.PATCH,
        },
        //Products
        {
          path: 'products',
          method: RequestMethod.POST,
        },
        {
          path: 'products',
          method: RequestMethod.PATCH,
        },
        {
          path: 'products',
          method: RequestMethod.DELETE,
        },
        // shop followers
        {
          path: 'shop-follower',
          method: RequestMethod.POST,
        },
        {
          path: 'shop-follower/unfollow',
          method: RequestMethod.POST,
        },
        // cart
        {
          path: 'cart/items',
          method: RequestMethod.POST,
        },
        {
          path: 'cart',
          method: RequestMethod.GET,
        },
        {
          path: 'cart/shop',
          method: RequestMethod.GET,
        },
        {
          path: 'cart/items/:itemId',
          method: RequestMethod.PATCH,
        },
        {
          path: 'cart/items/:itemId',
          method: RequestMethod.DELETE,
        },
        //order
        {
          path: 'order/items',
          method: RequestMethod.POST,
        },
        {
          path: 'order/:id',
          method: RequestMethod.GET,
        },
        {
          path: 'order/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'order/my-order',
          method: RequestMethod.POST,
        },
        {
          path: 'order/shop',
          method: RequestMethod.POST,
        },
        // review
        {
          path: 'review',
          method: RequestMethod.POST,
        },
        {
          path: 'review/:id',
          method: RequestMethod.PATCH,
        },
        {
          path: 'review/:id',
          method: RequestMethod.DELETE,
        },
        {
          path: 'review/:id',
          method: RequestMethod.GET,
        },
        // static
        {
          path: 'statistics',
          method: RequestMethod.GET,
        },
        {
          path: 'statistics/orders',
          method: RequestMethod.GET,
        },
        {
          path: 'statistics/best-selling-products',
          method: RequestMethod.GET,
        },
        {
          path: 'statistics/top-customers',
          method: RequestMethod.GET,
        },

        {
          path: 'statistics/cancelled-orders-rate',
          method: RequestMethod.GET,
        },
        {
          path: 'statistics/revenue-by-month',
          method: RequestMethod.GET,
        },
        {
          path: 'statistics/orders-users-month',
          method: RequestMethod.GET,
        },
        {
          path: 'shop-statistics/:id',
          method: RequestMethod.GET,
        },
        {
          path: 'shop-statistics/revenue-by-month/:id',
          method: RequestMethod.GET,
        },
      );
  }
}
