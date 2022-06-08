import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatePrimaryGeneratedCollumnToIdEntities1654724403503 implements MigrationInterface {
    name = 'UpdatePrimaryGeneratedCollumnToIdEntities1654724403503'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_b0fa3d9e6a67684348571867e8c"`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "salePrice" character varying NOT NULL, "costPrice" character varying NOT NULL, "unitType" character varying NOT NULL, "urlImg" TIMESTAMP NOT NULL, "establishmentId" uuid, CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "email" character varying NOT NULL, "contact" character varying NOT NULL, "password" character varying NOT NULL, "avatar" character varying NOT NULL, "created" TIMESTAMP NOT NULL, "lastAccess" TIMESTAMP NOT NULL, "isActivate" boolean NOT NULL, "isAdmin" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "establishments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "cnpj" character varying NOT NULL, "contact" character varying NOT NULL, "urlLogo" character varying NOT NULL, "userIdId" uuid, "addressIdId" uuid, CONSTRAINT "REL_9f83c472849536b5af3ab8fb1f" UNIQUE ("addressIdId"), CONSTRAINT "PK_7fb6da6c365114ccb61b091bbdf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "payments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "formOfPagament" character varying NOT NULL, CONSTRAINT "PK_197ab7af18c93fbb0c9b28b4a59" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "sales" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "date" TIMESTAMP NOT NULL, "paidDate" TIMESTAMP NOT NULL, "saleTotal" integer NOT NULL, "remainToPlay" integer NOT NULL, "clientIdId" uuid, "paymentIdId" uuid, CONSTRAINT "REL_f69c54a98a0ac2cfeffe97c8a7" UNIQUE ("paymentIdId"), CONSTRAINT "PK_4f0bc990ae81dba46da680895ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products_categories_category" ("productsId" uuid NOT NULL, "categoryId" uuid NOT NULL, CONSTRAINT "PK_c8a2d1a94d8aee029af4c6be5c7" PRIMARY KEY ("productsId", "categoryId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_472c77dfe20a4c6d4258dc8379" ON "products_categories_category" ("productsId") `);
        await queryRunner.query(`CREATE INDEX "IDX_62254eefb150c9a51119fe1a61" ON "products_categories_category" ("categoryId") `);
        await queryRunner.query(`CREATE TABLE "sales_products_products" ("salesId" uuid NOT NULL, "productsId" uuid NOT NULL, CONSTRAINT "PK_62861f1ae04e176c3606ba6bd94" PRIMARY KEY ("salesId", "productsId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f29355e1d4d0ea504077a30449" ON "sales_products_products" ("salesId") `);
        await queryRunner.query(`CREATE INDEX "IDX_dc1ade1611cfc9b55ec14c7286" ON "sales_products_products" ("productsId") `);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "id" SET DEFAULT uuid_generate_v4()`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_4a2d2e7f7959728d1aeae954ec1" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD CONSTRAINT "FK_e349f13c19778fce2caddf56dd1" FOREIGN KEY ("userIdId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "establishments" ADD CONSTRAINT "FK_9f83c472849536b5af3ab8fb1f1" FOREIGN KEY ("addressIdId") REFERENCES "address"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_1d996fa7239688d18b66c85e45c" FOREIGN KEY ("clientIdId") REFERENCES "client"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "sales" ADD CONSTRAINT "FK_f69c54a98a0ac2cfeffe97c8a78" FOREIGN KEY ("paymentIdId") REFERENCES "payments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_b0fa3d9e6a67684348571867e8c" FOREIGN KEY ("establishmentId") REFERENCES "establishments"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" ADD CONSTRAINT "FK_62254eefb150c9a51119fe1a613" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_products_products" ADD CONSTRAINT "FK_f29355e1d4d0ea504077a30449d" FOREIGN KEY ("salesId") REFERENCES "sales"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "sales_products_products" ADD CONSTRAINT "FK_dc1ade1611cfc9b55ec14c72863" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "sales_products_products" DROP CONSTRAINT "FK_dc1ade1611cfc9b55ec14c72863"`);
        await queryRunner.query(`ALTER TABLE "sales_products_products" DROP CONSTRAINT "FK_f29355e1d4d0ea504077a30449d"`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_62254eefb150c9a51119fe1a613"`);
        await queryRunner.query(`ALTER TABLE "products_categories_category" DROP CONSTRAINT "FK_472c77dfe20a4c6d4258dc8379f"`);
        await queryRunner.query(`ALTER TABLE "client" DROP CONSTRAINT "FK_b0fa3d9e6a67684348571867e8c"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_f69c54a98a0ac2cfeffe97c8a78"`);
        await queryRunner.query(`ALTER TABLE "sales" DROP CONSTRAINT "FK_1d996fa7239688d18b66c85e45c"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP CONSTRAINT "FK_9f83c472849536b5af3ab8fb1f1"`);
        await queryRunner.query(`ALTER TABLE "establishments" DROP CONSTRAINT "FK_e349f13c19778fce2caddf56dd1"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_4a2d2e7f7959728d1aeae954ec1"`);
        await queryRunner.query(`ALTER TABLE "client" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "category" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "address" ALTER COLUMN "id" DROP DEFAULT`);
        await queryRunner.query(`DROP INDEX "public"."IDX_dc1ade1611cfc9b55ec14c7286"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f29355e1d4d0ea504077a30449"`);
        await queryRunner.query(`DROP TABLE "sales_products_products"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_62254eefb150c9a51119fe1a61"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_472c77dfe20a4c6d4258dc8379"`);
        await queryRunner.query(`DROP TABLE "products_categories_category"`);
        await queryRunner.query(`DROP TABLE "sales"`);
        await queryRunner.query(`DROP TABLE "payments"`);
        await queryRunner.query(`DROP TABLE "establishments"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`ALTER TABLE "client" ADD CONSTRAINT "FK_b0fa3d9e6a67684348571867e8c" FOREIGN KEY ("establishmentId") REFERENCES "establishment"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
