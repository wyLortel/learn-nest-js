import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  controllers: [UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
