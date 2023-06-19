import {UpdatePostDto as IUpdatePostDto} from "@lib/post/application-services/commands/dto";
import {IsOptional, IsString, IsUUID} from "class-validator";
import {ApiPropertyOptional} from "@nestjs/swagger";


export class UpdatePostDto implements IUpdatePostDto {
  @IsUUID()
  id: string

  @ApiPropertyOptional({description: 'Post title', type: 'string'})
  @IsString()
  @IsOptional()
  title?: string

  @ApiPropertyOptional({description: 'Post message', type: 'string'})
  @IsString()
  @IsOptional()
  message?: string

  @IsUUID()
  authorId: string
}