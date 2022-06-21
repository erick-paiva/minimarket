import { MigrationInterface, QueryRunner } from "typeorm";

export class updateSaleEntities1655815751288 implements MigrationInterface {
    name = 'updateSaleEntities1655815751288'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "isPaid" boolean NOT NULL`);
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "date" SET DEFAULT now()`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ALTER COLUMN "date" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "isPaid"`);
    }

}
