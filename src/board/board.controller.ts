import { Controller, Get, Param } from '@nestjs/common';
import { BoardService } from './board.service';

interface Board {
  id: string;
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
  findOne(@Param('id') id: string): Board {
    return this.boardService.findOne(id);
  }
}
