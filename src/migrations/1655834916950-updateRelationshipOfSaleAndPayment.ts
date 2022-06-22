import { MigrationInterface, QueryRunner } from "typeorm";

export class updateRelationshipOfSaleAndPayment1655834916950
  implements MigrationInterface
{
  name = "updateRelationshipOfSaleAndPayment1655834916950";

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "salePrice"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "salePrice" integer NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "costPrice"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "costPrice" integer NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "formOfPagament" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_0412bbfa60d1c8fc17cb49c28f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "remainToPay" SET NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "REL_0412bbfa60d1c8fc17cb49c28f"`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_0412bbfa60d1c8fc17cb49c28f5" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "sales" DROP CONSTRAINT "FK_0412bbfa60d1c8fc17cb49c28f5"`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "REL_0412bbfa60d1c8fc17cb49c28f" UNIQUE ("paymentId")`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ALTER COLUMN "remainToPay" DROP NOT NULL`
    );
    await queryRunner.query(
      `ALTER TABLE "sales" ADD CONSTRAINT "FK_0412bbfa60d1c8fc17cb49c28f5" FOREIGN KEY ("paymentId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE "payments" ALTER COLUMN "formOfPagament" DROP NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "costPrice"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "costPrice" character varying NOT NULL`
    );
    await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "salePrice"`);
    await queryRunner.query(
      `ALTER TABLE "products" ADD "salePrice" character varying NOT NULL`
    );
  }
}
