import { MigrationInterface, QueryRunner } from "typeorm";

export class Sample1720452206127 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('SELECT "HELLO WORLD"');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
    }

}
