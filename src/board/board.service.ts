import { Injectable, NotFoundException } from '@nestjs/common';

interface Board {
  id: string;
  title: string;
  content: string;
}

@Injectable()
export class BoardService {
  private boards: Board[] = [
    {
      id: '1',
      title: '첫번째 게시글 - 제목',
      content: '첫번쨰 게시글 - 본문',
    },
    {
      id: '2',
      title: '두번째 게시글 - 제목',
      content: '두번쨰 게시글 - 본문',
    },
    {
      id: '3',
      title: '세번째 게시글 - 제목',
      content: '세번쨰 게시글 - 본문',
    },
  ];

  findAll(): Board[] {
    return this.boards;
  }
  findOne(id: string): Board {
    const board = this.boards.find((board) => board.id === id);

    if (!board) {
      throw new NotFoundException(
        `id ${id}에 해당하는 게시글을 찾을수 없습니다 `,
      );
    }
    return board;
  }
}
