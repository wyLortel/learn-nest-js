import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from './users/users.controller';
import { ConfigModule } from '@nestjs/config';
import { UsersService } from './users/users.service';
import { BoardModule } from './board/board.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), BoardModule],
  controllers: [UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
