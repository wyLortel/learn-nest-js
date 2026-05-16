import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { UsersController } from '../../users/users.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UsersService } from '../../users/users.service';
import { BoardModule } from '../../board/board.module';
import { ClassroomModule } from '../../classroom/classroom.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    //config모듈 설정: .env파일 로드
    ConfigModule.forRoot({
      isGlobal: true, //전역으로 config 사용 가능
      envFilePath: `.env/${process.env.NODE_ENV || 'development'}.env`,
    }),

    // TypeOrmModule 비동기 설정 : ConfigService의 환경 변수 주입
    TypeOrmModule.forRootAsync({
      inject: [ConfigService], //이걸 불러야  config서비스 인스턴스 주입 받음

      // 실제 데이터베이스와  연결을 하기위해 설정을 수행하는 팩토리 함수
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('DB_TYPE') as 'postgres',
        host: configService.get<string>('DB_HOST'),
        port: configService.get<number>('DB_PORT'),
        username: configService.get<string>('DB_USERNAME'),
        password: configService.get<string>('DB_PASSWORD'),
        database: configService.get<string>('DB_DATABASE'),

        //엔티티 로드 설정
        autoLoadEntities: true,

        // 데이터베이스 스키마 동기화 (새발시 편리 운영 시 정대 금지)
        synchronize: configService.get('NODE_ENV') === 'development',
      }),
    }),

    BoardModule,
    ClassroomModule,
  ],
  controllers: [UsersController],
  providers: [AppService, UsersService],
})
export class AppModule {}
