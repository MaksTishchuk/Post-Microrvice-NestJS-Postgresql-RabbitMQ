import {CreatePostDto as ICreatePostDto} from "@lib/post/application-services/commands/dto";
import {IsNotEmpty, IsString} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreatePostDto implements ICreatePostDto {
  @ApiProperty({description: 'Post title', type: 'string'})
  @IsString()
  @IsNotEmpty()
  title: string

  @ApiProperty({description: 'Post message', type: 'string'})
  @IsString()
  @IsNotEmpty()
  message: string

  @IsString()
  authorId: string
}