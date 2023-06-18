import { MigrationInterface, QueryRunner } from "typeorm";

export class PostCreateMigration1687017779378 implements MigrationInterface {
    name = 'PostCreateMigration1687017779378'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" SERIAL NOT NULL, "created_at" character varying NOT NULL, "updated_at" character varying NOT NULL, "title" character varying NOT NULL, "message" character varying NOT NULL, "author_id" integer NOT NULL, "is_published" boolean NOT NULL, CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id")); COMMENT ON COLUMN "posts"."id" IS 'The unique identifier'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
