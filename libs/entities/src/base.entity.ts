import {Column, PrimaryGeneratedColumn} from "typeorm";

export abstract class Base {

  @PrimaryGeneratedColumn({comment: 'The unique identifier'})
  id: number

  @Column({name: 'created_at'})
  createdAt: string

  @Column({name: 'updated_at'})
  updatedAt: string

}