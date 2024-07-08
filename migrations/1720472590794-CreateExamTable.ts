import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateExamTable1720472590794 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_lab_exams',
            columns: [
                {
                    name: 'exam_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'exam_name',
                    type: 'varchar',
                    length: '256',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'external_key',
                    type: 'int',
                    isNullable: true,
                },
            ],
        }));

        await queryRunner.createForeignKey('tbl_lab_exams', new TableForeignKey({
            columnNames: ['external_key'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_m_result_external_key',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_lab_exams', 'FK_tbl_lab_exams_external_key');
        await queryRunner.dropTable('tbl_lab_exams');
    }

}
