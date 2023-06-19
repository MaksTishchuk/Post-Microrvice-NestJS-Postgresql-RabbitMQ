import {Column, PrimaryColumn} from "typeorm";

export abstract class Base {

  @PrimaryColumn('uuid')
  id: string

  @Column({name: 'created_at'})
  createdAt: string

  @Column({name: 'updated_at'})
  updatedAt: string

}