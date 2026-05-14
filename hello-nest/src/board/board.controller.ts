import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { CreatePostDto } from './dto/create-post-dto';

interface Board {
  id: number;
  title: string;
  content: string;
}

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get()
  findAll(): Board[] {
    // return ' findAll 호출';
    return this.boardService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Board {
    return this.boardService.findOne(id);
  }

  @Post()
  @UsePipes(new ValidationPipe()) //해당 핸들러에 파이프 적용
  create(@Body() data: CreatePostDto) {
    //이곳에 도달했다면 유효성 검사가 통과한 상태임이 보장
    return this.boardService.create(data);
  }

  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() data: any): Board {
    return this.boardService.update(id, data);
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Board[] {
    return this.boardService.delete(id);
  }
}
