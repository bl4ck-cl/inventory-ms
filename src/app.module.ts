import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ProvidersModule } from './providers/providers.module';
import { UsersProfilesModule } from './users-profiles/users-profiles.module';

@Module({
  imports: [UsersModule, AuthModule, ConfigModule.forRoot({
    isGlobal: true,
  }),
    MongooseModule.forRoot('mongodb://localhost/inventory'),
    ProvidersModule,
    UsersProfilesModule,],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
