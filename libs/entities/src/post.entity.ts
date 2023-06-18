import {Base} from "@lib/entities/base.entity";
import {Column, Entity} from "typeorm";

@Entity('posts')
export class PostEntity extends Base {
  @Column()
  title: string

  @Column()
  message: string

  @Column({name: 'author_id'})
  authorId: number

  @Column({name: 'is_published'})
  isPublished: boolean
}