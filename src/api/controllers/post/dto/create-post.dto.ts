import {CreatePostDto as ICreatePostDto} from "@lib/post/application-services/commands/dto";
import {IsNotEmpty, IsNumber, IsString} from "class-validator";

export class CreatePostDto implements ICreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string

  @IsString()
  @IsNotEmpty()
  message: string

  @IsNumber()
  authorId: string
}