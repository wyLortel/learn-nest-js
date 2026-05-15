//nest js 애플리케이션 인스턴스를 생성하는데 필요한 유틸리티 가져옴
import { NestFactory } from '@nestjs/core';

//스웨거 모듈과 문서 설정을 위한 빌더를 가져옴
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

//애플리케이션 루트 모듈을 가져옴
import { AppModule } from './modules/app/app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';

//비동기 함수로 애플리케이션 초기 설정을 시작
async function bootstrap() {
  //nest 애플리케이션 인스턴트 생성
  const app = await NestFactory.create(AppModule);

  // DocumentBuilder를 사용하여 스웨거 문서의 기본 정보 설정
  const config = new DocumentBuilder()
    //문서 페이지의 제목을 설정
    .setTitle('nest.js api 예시')
    //문서에 대한 간략한 설명을 추가
    .setDescription('nest js를 사용한 백엔드api 설명')
    //api 버전을 설정
    .setVersion('1.0')
    // 문서에서 api들을 그룹화할 태그를 미리 정의
    .addTag('service-name')
    //설정을 완료후 빌더 객체를 생성
    .build();

  //swagger 문서 생성 함수 (팩토리)정의
  //SwaggerModule.createDocument는 애플리케이션의 모든 라우트 디티오 등의 메타데이터를 읽어
  //오픈에이피아이 제이슨 객체 생성
  //setup() 함수가 문서 객체 대신 문서를 생성하는 팩토리를 받도록
  const documentFactory = () => SwaggerModule.createDocument(app, config);

  //swagger ui 엔드포인트 설정
  //예process.env.PORT ?? 3000/api 여기로 볼수잇음
  //두번재 인자는 nest애플리케이션 인스턴스
  //세번째 인자 다큐먼트 팩토리는 위에서 정의한 문서 생성 함수
  SwaggerModule.setup('api', app, documentFactory);

  //전역 필터 등록
  app.useGlobalFilters(new HttpExceptionFilter());

  //환경변수 포트가 있다면 해당 포트를 사용하고 없다면 기본값 3000번 포트로 서버를 실행
  await app.listen(process.env.PORT ?? 3000);
}

//애플리케이션을 시작하는 함수를 호출한다
bootstrap();
