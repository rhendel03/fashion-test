import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SalesModule } from './sales/sales.module';

@Module({
  imports: [TypeOrmModule.forRoot({}), SalesModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {}
