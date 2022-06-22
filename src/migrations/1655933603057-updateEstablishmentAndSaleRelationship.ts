import { MigrationInterface, QueryRunner } from "typeorm";

export class updateEstablishmentAndSaleRelationship1655933603057 implements MigrationInterface {
    name = 'updateEstablishmentAndSaleRelationship1655933603057'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" ADD "establishmentId" uuid`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_c987d38c91f19c56144eb018957" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_c987d38c91f19c56144eb018957"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP COLUMN "establishmentId"`);
    }

}
