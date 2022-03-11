import { MigrationInterface, QueryRunner } from 'typeorm';

export class initColumns1646116349876 implements MigrationInterface {
  name = 'initColumns1646116349876';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo_columns" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_88112a857d79832f8e58c9d5035" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_columns" ADD CONSTRAINT "FK_a019182276afa36d60b5162b04e" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "todo_columns" DROP CONSTRAINT "FK_a019182276afa36d60b5162b04e"`,
    );
    await queryRunner.query(`DROP TABLE "todo_columns"`);
  }
}
