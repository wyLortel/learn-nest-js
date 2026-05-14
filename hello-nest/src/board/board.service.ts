import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post-dto';

interface Board {
  id: number;
  title: string;
  content: string;
  author: string;
  major: string;
}

@Injectable()
export class BoardService {
  private boards: Board[] = [
    {
      id: 1,
      title: '첫번째 게시글 - 제목',
      content: '첫번쨰 게시글 - 본문',
      author: '',
      major: '',
    },
    {
      id: 2,
      title: '두번째 게시글 - 제목',
      content: '두번쨰 게시글 - 본문',
      author: '',
      major: '',
    },
    {
      id: 3,
      title: '세번째 게시글 - 제목',
      content: '세번쨰 게시글 - 본문',
      author: '',
      major: '',
    },
  ];

  findAll(): Board[] {
    return this.boards;
  }
  findOne(id: number): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(
        `id ${id}에 해당하는 게시글을 찾을수 없습니다 `,
      );
    }
    return board;
  }

  create(payload: CreatePostDto) {
    const newBoard = { ...payload, id: this.generateId() };
    this.boards.push(newBoard);

    return newBoard;
  }

  generateId() {
    return this.boards.length === 0
      ? 1
      : Math.max(...this.boards.map((board) => board.id)) + 1;
  }

  update(id: number, payload: any) {
    const boardIndex = this.boards.findIndex((board) => board.id === id);

    if (boardIndex === -1) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을수 없습니다`,
      );
    }
    this.boards[boardIndex] = { ...this.boards[boardIndex], ...payload };

    return this.boards[boardIndex];
  }

  delete(id: number): Board[] {
    const boardIndex = this.boards.findIndex((board) => board.id === id);

    if (boardIndex === -1) {
      throw new NotFoundException(
        `ID ${id}에 해당하는 게시글을 찾을수 없습니다`,
      );
    }
    this.boards.splice(boardIndex, 1);

    return this.boards;
  }
}
