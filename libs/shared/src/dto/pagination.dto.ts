import {IsNumber, IsOptional, IsPositive, Min} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty, ApiPropertyOptional} from "@nestjs/swagger";

export class PaginationDto {

  @ApiPropertyOptional({description: 'Offset number', type: 'number'})
  @IsOptional()
  @Min(0)
  @IsNumber({allowNaN: false, allowInfinity: false})
  @Type(() => Number)
  offset = 0

  @ApiPropertyOptional({description: 'Post limit by page', type: 'number'})
  @IsOptional()
  @IsNumber({allowNaN: false, allowInfinity: false})
  @Type(() => Number)
  @IsPositive()
  limit = 10
}