import { MigrationInterface, QueryRunner } from "typeorm";

export class updateTypeNumericForNumbers1655836608626 implements MigrationInterface {
    name = 'updateTypeNumericForNumbers1655836608626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "salePrice"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "salePrice" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "costPrice"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "costPrice" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "saleTotal"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "saleTotal" numeric NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "remainToPlay"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "remainToPlay" numeric NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "remainToPlay"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "remainToPlay" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "saleTotal"`);
        await queryRunner.query(`ALTER TABLE "sales" ADD "saleTotal" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "costPrice"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "costPrice" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "salePrice"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "salePrice" integer NOT NULL`);
    }

}
