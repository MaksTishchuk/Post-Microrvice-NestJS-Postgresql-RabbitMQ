import {UpdatePostDto as IUpdatePostDto} from "@lib/post/application-services/commands/dto";
import {IsOptional, IsString, IsUUID} from "class-validator";


export class UpdatePostDto implements IUpdatePostDto {
  @IsUUID()
  id: string

  @IsString()
  @IsOptional()
  title?: string

  @IsString()
  @IsOptional()
  message?: string

  @IsUUID()
  authorId: string
}