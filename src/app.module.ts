import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {config} from "./config/config"

import {MongooseModule} from "@nestjs/mongoose"
import { userModule } from './modules/user/user.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { apparelModule } from './modules/apparel/apparel.module';
@Module({
  imports: [
    MongooseModule.forRoot(config.mongo_url),
    userModule,
    apparelModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}