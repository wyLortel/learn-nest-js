import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response, Request } from 'express';
//@Catch 데코레이터는 이필터가 HttpException 타입의 에러만 잡겠다 라는 뜻
@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp(); // 1. 실행 컨텍스트ㅔ서 http 관련 객체를 가져옴
    const response = ctx.getResponse<Response>(); // 익스 프레스의 리스폰스 객체 응답을 받아 오는ㄱ것
    const request = ctx.getRequest<Request>(); //익스프레스의 리퀘스트 객체
    const status = exception.getStatus(); // 예외가 발생한 상태 코드 예 404

    //exception에서 message 부분을 추출
    const errorResponse = exception.getResponse();
    const message =
      typeof errorResponse === 'object'
        ? errorResponse['message']
        : errorResponse;

    //우리가 원하는 형태로 응답 json을 조립한다
    response.status(status).json({
      timestamp: new Date().toISOString(),
      statusCode: status,
      message: message,
      path: request.url,
      success: false,
    });
  }
}
