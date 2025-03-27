import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1743077290558 implements MigrationInterface {
    name = 'Migration1743077290558'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "posts" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "text" character varying(200) NOT NULL, "userId" uuid NOT NULL, "originalPostId" uuid, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "sentiment" character varying(20), CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "username" character varying(14) NOT NULL, "displayName" character varying(30) NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "CHK_8a93b426076a55f01cb3752bf3" CHECK (username ~ '^[a-zA-Z0-9]+$'), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "followers" ("followerId" uuid NOT NULL, "followingId" uuid NOT NULL, CONSTRAINT "PK_1485f24f1f66ac91ea2c5517ebd" PRIMARY KEY ("followerId", "followingId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON "followers" ("followerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e34418be6d904b779ca96cf93" ON "followers" ("followingId") `);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_ae05faaa55c866130abef6e1fee" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "posts" ADD CONSTRAINT "FK_6b39bb6fbc424cb59b9f414c652" FOREIGN KEY ("originalPostId") REFERENCES "posts"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_5e34418be6d904b779ca96cf932" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_5e34418be6d904b779ca96cf932"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_6b39bb6fbc424cb59b9f414c652"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP CONSTRAINT "FK_ae05faaa55c866130abef6e1fee"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e34418be6d904b779ca96cf93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_451bb9eb792c3023a164cf14e0"`);
        await queryRunner.query(`DROP TABLE "followers"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "posts"`);
    }

}
