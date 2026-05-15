import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';

//users 로 시작하는 모든 요청을 처리하는 컨트롤러
// 예 https:localhost:3000/users
@Controller('users')
export class AppController {
  //create
  @Post()
  create(@Body() body: { email: string; password: string }) {
    return `새로운 사용자 생성: ${body.email}`;
  }

  //read
  @Get()
  findAll(@Query('page') page?: number) {
    const currentPage = page || 1;
    return `모든 사용자 조회(현재 페이지: ${currentPage})`;
  }

  //read
  @Get(':id')
  findOne(@Param('id') userId: string) {
    return `사용자 조회 (ID: ${userId} )`;
  }

  //update
  @Put(':id')
  update(@Param('id') id: string, @Body() body: { name: string }) {
    return `사용자 ID ${id} 수정 => 이름: ${body.name}`;
  }

  //delete
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `사용자 삭제 (ID: ${id})`;
  }
}
