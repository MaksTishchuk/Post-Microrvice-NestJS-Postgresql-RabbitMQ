import { MigrationInterface, QueryRunner } from "typeorm";

export class PostMigration1687105777617 implements MigrationInterface {
    name = 'PostMigration1687105777617'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "author_id" character varying NOT NULL, "is_published" boolean NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
