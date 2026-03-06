import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772547706193 implements MigrationInterface {
    name = 'Init1772547706193'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "customers" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "region" character varying NOT NULL, "industry" character varying, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_133ec679a801fab5e070f73d3ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f47d96e418dc88147de96f6597" ON "customers" ("region") `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX "public"."IDX_f47d96e418dc88147de96f6597"`);
        await queryRunner.query(`DROP TABLE "customers"`);
    }

}
