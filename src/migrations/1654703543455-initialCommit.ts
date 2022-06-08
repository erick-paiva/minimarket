import { MigrationInterface, QueryRunner } from "typeorm";

export class initialCommit1654703543455 implements MigrationInterface {
    name = 'initialCommit1654703543455'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "address" ("id" uuid NOT NULL, "street" character varying NOT NULL, "number" integer NOT NULL, "zipCode" character varying NOT NULL, "district" character varying NOT NULL, CONSTRAINT "PK_d92de1f82754668b5f5f5dd4fd5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "category" ("id" uuid NOT NULL, "name" character varying NOT NULL, "image" character varying NOT NULL, CONSTRAINT "PK_9c4e4a89e3674fc9f382d733f03" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "salePrice" character varying NOT NULL, "costPrice" character varying NOT NULL, "unitType" character varying NOT NULL, "urlImg" TIMESTAMP NOT NULL, "establishmentId" uuid, CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "contact" character varying NOT NULL, "password_hash" character varying NOT NULL, "avatar" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "lastAccess" TIMESTAMP NOT NULL, "isActivate" boolean NOT NULL, "isAdmin" character varying NOT NULL, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "establishment" ("id" uuid NOT NULL, "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "contact" character varying NOT NULL, "urlLogo" character varying NOT NULL, "userIdId" uuid, "addressIdId" uuid, CONSTRAINT "REL_767f0aabfd8d801bccee7559c6" UNIQUE ("addressIdId"), CONSTRAINT "PK_149bd9dc1f2bd4e825a0c474932" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payment" ("id" uuid NOT NULL, "formOfPagament" character varying NOT NULL, CONSTRAINT "PK_fcaec7df5adf9cac408c686b2ab" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sale" ("id" uuid NOT NULL, "date" TIMESTAMP NOT NULL, "paidDate" TIMESTAMP NOT NULL, "saleTotal" integer NOT NULL, "remainToPlay" integer NOT NULL, "clientIdId" uuid, "paymentIdId" uuid, CONSTRAINT "REL_3bf57fc4c53d16f81f09014e5c" UNIQUE ("paymentIdId"), CONSTRAINT "PK_d03891c457cbcd22974732b5de2" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "client" ("id" uuid NOT NULL, "name" character varying NOT NULL, "avatar" character varying NOT NULL, "contact" character varying NOT NULL, "payDay" integer NOT NULL, "isDeptor" boolean NOT NULL, "isLate" boolean NOT NULL, "isActivate" boolean NOT NULL, "establishmentId" uuid, CONSTRAINT "PK_96da49381769303a6515a8785c7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "product_categories_category" ("productId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_17f2a361443184000ee8d79f240" PRIMARY KEY ("productId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_342d06dd0583aafc156e076379" ON "product_categories_category" ("productId") `);
        await queryRunner.query(`CREATE INDEX "IDX_15520e638eb4c46c4fb2c61c4b" ON "product_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "sale_products_product" ("saleId" uuid NOT NULL, "productId" uuid NOT NULL, CONSTRAINT "PK_e81a9bdb9f8a6b2afa9d6ea6a94" PRIMARY KEY ("saleId", "productId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_d0390564ee502415f34c629ea1" ON "sale_products_product" ("saleId") `);
        await queryRunner.query(`CREATE INDEX "IDX_4e537a454b2d5fb3df653bbabe" ON "sale_products_product" ("productId") `);
        await queryRunner.query(`ALTER TABLE "product" ADD CONSTRAINT "FK_399cf923e340e8808674b0a58f3" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_a7d5bda4f43799aeda1062eb422" FOREIGN KEY ("userIdId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishment" ADD CONSTRAINT "FK_767f0aabfd8d801bccee7559c6c" FOREIGN KEY ("addressIdId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_334f0be1a8b478984f6ab7d4515" FOREIGN KEY ("clientIdId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sale" ADD CONSTRAINT "FK_3bf57fc4c53d16f81f09014e5c5" FOREIGN KEY ("paymentIdId") REFERENCES "payment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_b0fa3d9e6a67684348571867e8c" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_342d06dd0583aafc156e0763790" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" ADD CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sale_products_product" ADD CONSTRAINT "FK_d0390564ee502415f34c629ea1a" FOREIGN KEY ("saleId") REFERENCES "sale"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sale_products_product" ADD CONSTRAINT "FK_4e537a454b2d5fb3df653bbabef" FOREIGN KEY ("productId") REFERENCES "product"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sale_products_product" DROP CONSTRAINT "FK_4e537a454b2d5fb3df653bbabef"`);
        await queryRunner.query(`ALTER TABLE "sale_products_product" DROP CONSTRAINT "FK_d0390564ee502415f34c629ea1a"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_15520e638eb4c46c4fb2c61c4b4"`);
        await queryRunner.query(`ALTER TABLE "product_categories_category" DROP CONSTRAINT "FK_342d06dd0583aafc156e0763790"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_b0fa3d9e6a67684348571867e8c"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_3bf57fc4c53d16f81f09014e5c5"`);
        await queryRunner.query(`ALTER TABLE "sale" DROP CONSTRAINT "FK_334f0be1a8b478984f6ab7d4515"`);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_767f0aabfd8d801bccee7559c6c"`);
        await queryRunner.query(`ALTER TABLE "establishment" DROP CONSTRAINT "FK_a7d5bda4f43799aeda1062eb422"`);
        await queryRunner.query(`ALTER TABLE "product" DROP CONSTRAINT "FK_399cf923e340e8808674b0a58f3"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_4e537a454b2d5fb3df653bbabe"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_d0390564ee502415f34c629ea1"`);
        await queryRunner.query(`DROP TABLE "sale_products_product"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_15520e638eb4c46c4fb2c61c4b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_342d06dd0583aafc156e076379"`);
        await queryRunner.query(`DROP TABLE "product_categories_category"`);
        await queryRunner.query(`DROP TABLE "client"`);
        await queryRunner.query(`DROP TABLE "sale"`);
        await queryRunner.query(`DROP TABLE "payment"`);
        await queryRunner.query(`DROP TABLE "establishment"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "product"`);
        await queryRunner.query(`DROP TABLE "category"`);
        await queryRunner.query(`DROP TABLE "address"`);
    }

}
