//사용자의 요청을 받는 입구
import { Controller, Get, Post, Body, Param, ParseIntPipe, Patch, Delete } from '@nestjs/common';
import { PostsService } from './posts.service';
import type { CreatePostDto } from './dto/create-post.dto';
import type { Post as PostInterface } from './interfaces/post.interface';
import { UpdatePostDto } from './dto/update-post.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService){}

  @Post()
  create(@Body() createPostDto: CreatePostDto): PostInterface {
    return this.postsService.create(createPostDto);
  }

  @Get()
  findAll(): PostInterface[] {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() UpdatePostDto: UpdatePostDto,
  ): PostInterface {
    return this.postsService.update(id , UpdatePostDto)
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number): void {
    return this.postsService.remove(id);
  }

}
