import { MigrationInterface, QueryRunner } from 'typeorm';

export class initCardsAndComments1647069095400 implements MigrationInterface {
  name = 'initCardsAndComments1647069095400';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "todo_cards" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" text NOT NULL, "description" text, "todoColumnId" uuid NOT NULL, "userId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_dab96fadee050f94a442d39e638" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" text NOT NULL, "authorId" uuid NOT NULL, "todoCardId" uuid NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8bf68bc960f2b69e818bdb90dcb" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_cards" ADD CONSTRAINT "FK_04d21abd4f4672cd808c00b5486" FOREIGN KEY ("todoColumnId") REFERENCES "todo_columns"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_cards" ADD CONSTRAINT "FK_0db007823859a4695ecd79a0463" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_4548cc4a409b8651ec75f70e280" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" ADD CONSTRAINT "FK_05f134d22994b88eca152cdf525" FOREIGN KEY ("todoCardId") REFERENCES "todo_cards"("id") ON DELETE CASCADE ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_05f134d22994b88eca152cdf525"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comments" DROP CONSTRAINT "FK_4548cc4a409b8651ec75f70e280"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_cards" DROP CONSTRAINT "FK_0db007823859a4695ecd79a0463"`,
    );
    await queryRunner.query(
      `ALTER TABLE "todo_cards" DROP CONSTRAINT "FK_04d21abd4f4672cd808c00b5486"`,
    );
    await queryRunner.query(`DROP TABLE "comments"`);
    await queryRunner.query(`DROP TABLE "todo_cards"`);
  }
}
