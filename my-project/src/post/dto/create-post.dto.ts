import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class createPostDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;

  @IsNotEmpty()
  @IsNumber()
  authorId: string;
}
