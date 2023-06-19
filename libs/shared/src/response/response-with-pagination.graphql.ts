import {Type} from "@nestjs/common";
import {Field, Int, ObjectType} from "@nestjs/graphql";

export interface IPaginatedType<T = unknown> {
  offset: number
  limit: number
  posts: T[],
  count: number
}

export function Paginated<T = unknown>(classRef: Type<T>): Type<IPaginatedType<T>> {
  @ObjectType({isAbstract: true})
  abstract class PaginatedType implements IPaginatedType<T> {
    @Field(() => Int)
    offset: number

    @Field(() => Int)
    limit: number

    @Field(() => [classRef], {nullable: true})
    posts: T[]

    @Field(() => Int)
    count: number
  }
  return PaginatedType as Type<IPaginatedType<T>>
}