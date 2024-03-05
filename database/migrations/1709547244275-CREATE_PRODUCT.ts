import { MigrationInterface, QueryRunner } from 'typeorm';

export class CREATEPRODUCT1709547244275 implements MigrationInterface {
  name = 'CREATEPRODUCT1709547244275';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "product" ("id" SERIAL NOT NULL, "name" character varying(150) NOT NULL, "shortName" character varying(50), "description" character varying(2000), "shortDescription" character varying(2000), "createdate" TIMESTAMP NOT NULL DEFAULT now(), "updateddate" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "product"`);
  }
}
