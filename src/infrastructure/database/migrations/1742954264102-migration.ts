import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1742954264102 implements MigrationInterface {
    name = 'Migration1742954264102'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_5e34418be6d904b779ca96cf932"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_451bb9eb792c3023a164cf14e0"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e34418be6d904b779ca96cf93"`);
        await queryRunner.query(`ALTER TABLE "posts" ADD "sentiment" character varying(20)`);
        await queryRunner.query(`CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON "followers" ("followerId") `);
        await queryRunner.query(`CREATE INDEX "IDX_5e34418be6d904b779ca96cf93" ON "followers" ("followingId") `);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_5e34418be6d904b779ca96cf932" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_5e34418be6d904b779ca96cf932"`);
        await queryRunner.query(`ALTER TABLE "followers" DROP CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_5e34418be6d904b779ca96cf93"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_451bb9eb792c3023a164cf14e0"`);
        await queryRunner.query(`ALTER TABLE "posts" DROP COLUMN "sentiment"`);
        await queryRunner.query(`CREATE INDEX "IDX_5e34418be6d904b779ca96cf93" ON "followers" ("followingId") `);
        await queryRunner.query(`CREATE INDEX "IDX_451bb9eb792c3023a164cf14e0" ON "followers" ("followerId") `);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_5e34418be6d904b779ca96cf932" FOREIGN KEY ("followingId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "followers" ADD CONSTRAINT "FK_451bb9eb792c3023a164cf14e0a" FOREIGN KEY ("followerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

}
