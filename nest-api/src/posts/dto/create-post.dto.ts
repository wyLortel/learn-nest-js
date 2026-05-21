import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString({message: '제목은 문자열이어야합니다'})
  @IsNotEmpty({message: '제목은 비어 있을수 있습니다'})
  @MinLength(2,{message: '제목은 최소 2글자 이상이여야 합니다'})
  @MaxLength(100,{message: '제목은 최대 100글자 까지 입력할수있습니다'})
  title: string;

  @IsString({message: '제목은 문자열이어야합니다'})
  @IsNotEmpty({message: '제목은 비어 있을수 있습니다'})
  @MinLength(5,{message: '제목은 최소 5글자 이상이여야 합니다'})
  content: string;
}
