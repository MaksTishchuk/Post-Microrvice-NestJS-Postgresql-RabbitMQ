import {IsNumber, IsOptional, IsPositive, Min} from "class-validator";
import {Type} from "class-transformer";
import {ApiPropertyOptional} from "@nestjs/swagger";
import {ArgsType, Field, Int} from "@nestjs/graphql";

@ArgsType() // for graphql
export class PaginationDto {

  @ApiPropertyOptional({description: 'Offset number', type: 'number'})
  @IsOptional()
  @Min(0)
  @IsNumber({allowNaN: false, allowInfinity: false})
  @Type(() => Number)
  @Field(() => Int, {description: 'Offset number'})
  offset = 0

  @ApiPropertyOptional({description: 'Post limit by page', type: 'number'})
  @IsOptional()
  @IsNumber({allowNaN: false, allowInfinity: false})
  @Type(() => Number)
  @Field(() => Int, {description: 'Post limit by page'})
  @IsPositive()
  limit = 10
}