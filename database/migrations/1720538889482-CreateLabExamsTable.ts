import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_lab_exams';

const FK_EXTERNAL_EXAM: TableForeignKey = new TableForeignKey({
    name: 'fk_external_exam',
    columnNames: ['external_key'],
    referencedColumnNames: ['exam_external_key_id'],
    referencedTableName: 'tbl_lab_exam_external_key'
});

export class CreateLabExamsTable1720538889482 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'exam_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'exam_name',
                        type: 'varchar',
                        length: '256',
                        isUnique: true
                    },
                    {
                        name: 'external_key',
                        type: 'int',
                        isNullable: true
                    }
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_EXTERNAL_EXAM);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_EXTERNAL_EXAM);

        await queryRunner.dropTable(TABLE_NAME);
    }

}
