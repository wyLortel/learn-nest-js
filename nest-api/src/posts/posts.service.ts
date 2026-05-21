//실제 게시글의 로직을 처리하는곳
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './interfaces/post.interface';
import { UpdatePostDto } from './dto/update-post.dto';

//@Injectable() nest가 관리 하는 클래스 필요하면 다른곳에서 주입
@Injectable()
export class PostsService {
  //임시 디비
  private posts: Post[] = [];
  private nextId = 1;

  create(createPostDto: CreatePostDto): Post {
    const now = new Date();

    const post: Post = {
      id: this.nextId,
      title: createPostDto.title,
      content: createPostDto.content,
      createdAt: now,
      updatedAt: now,
    };

    this.posts.push(post);
    this.nextId += 1;

    return post;
  }

  findAll():Post[]{
    return this.posts;
  }

  findOne(id:number):Post{
    const post = this.posts.find((post) => post.id === id);

    if(!post){
      throw new NotFoundException(`id가 ${id}인 게시글을 찾을수 없습니다`);
    }

    return post;
  }

  update(id: number, updatePostDto: UpdatePostDto): Post {
    const post = this.findOne(id);

    const updatePost: Post = {
      ...post,
      ...updatePostDto,
      updatedAt: new Date(),
    };

    this.posts = this.posts.map((post) =>
      post.id === id ? updatePost : post,
    );

    return updatePost;
  }

  remove(id:number):void {
    //이건 그냥 존재하나를 확인하기 위한 코드
    this.findOne(id);
    this.posts = this.posts.filter((post)=> post.id !== id);
  }
}
