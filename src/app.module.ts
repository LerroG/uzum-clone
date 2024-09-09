import { Module } from '@nestjs/common'
import { PrismaModule } from './prisma/prisma.module'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { StoreModule } from './store/store.module';
import { CategoryModule } from './category/category.module';
import { ColorModule } from './color/color.module';
import { ProductModule } from './product/product.module';
import { StatisticModule } from './statistic/statistic.module';
import { ReviewModule } from './review/review.module';
import { FileModule } from './file/file.module';

@Module({
	imports: [ConfigModule.forRoot(), PrismaModule, AuthModule, UserModule, StoreModule, CategoryModule, ColorModule, ProductModule, StatisticModule, ReviewModule, FileModule]
})
export class AppModule {}
