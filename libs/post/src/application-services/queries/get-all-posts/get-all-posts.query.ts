import {PaginationDto} from "@lib/shared/dto";

export class GetAllPostsQuery {
  constructor(
    public readonly pagination: PaginationDto
  ) {}
}