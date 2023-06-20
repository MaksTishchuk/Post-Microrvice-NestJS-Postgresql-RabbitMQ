import {PaginationDto} from "@lib/shared/dto";
import {ApiExtraModels, ApiOkResponse, ApiProperty, getSchemaPath} from "@nestjs/swagger";
import {applyDecorators, Type} from "@nestjs/common";

export class ResponseWithPagination<T> extends PaginationDto {
  @ApiProperty({description: 'Posts count in database with isPublished = true', type: 'number'})
  count!: number

  @ApiProperty({
    description: 'Posts with isPublished = true',
    default: [],
    isArray: true,
    items: {}
  })
  posts: T[]
}

export const ApiOkResponsePaginated = <DataDto extends Type<unknown>> (dataDto: DataDto) => applyDecorators(
  ApiExtraModels(ResponseWithPagination),
  ApiOkResponse({
    schema: {
      allOf: [
        {$ref: getSchemaPath(ResponseWithPagination)},
        {
          properties: {
            posts: {
              type: 'array',
              items: {$ref: getSchemaPath(dataDto)}
            }
          }
        }
      ]
    }
  })
)