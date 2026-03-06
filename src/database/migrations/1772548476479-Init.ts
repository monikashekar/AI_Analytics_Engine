import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1772548476479 implements MigrationInterface {
    name = 'Init1772548476479'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "sales_reps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "region" character varying NOT NULL, "hireDate" date, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_999046f1493392afd99ad158b42" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_61f2f2a1c93696d842c0c27bd3" ON "sales_reps" ("region") `);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "category" character varying NOT NULL, "price" numeric(12,2) NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_c3932231d2385ac248d0888d95" ON "products" ("category") `);
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "quantity" integer NOT NULL, "totalAmount" numeric(12,2) NOT NULL, "saleDate" date NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, "customer_id" uuid, "sales_rep_id" uuid, "product_id" uuid, CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_65f3c52de52446c1d23ed5daf2" ON "sales" ("saleDate") `);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c5f8fb9cdaf3301afe6bd63e8ac" FOREIGN KEY ("sales_rep_id") REFERENCES "sales_reps"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_5015e2759303d7baaf47fc53cc8" FOREIGN KEY ("product_id") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_5015e2759303d7baaf47fc53cc8"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c5f8fb9cdaf3301afe6bd63e8ac"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c51005b2b06cec7aa17462c54f5"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_65f3c52de52446c1d23ed5daf2"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_c3932231d2385ac248d0888d95"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_61f2f2a1c93696d842c0c27bd3"`);
        await queryRunner.query(`DROP TABLE "sales_reps"`);
    }

}
