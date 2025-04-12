import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_m_results';

export class AddMedicalResultFieldsExamTypeAndSubtype1721433936627 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns(TABLE_NAME, [
            new TableColumn({
                name: 'exam_type',
                type: 'varchar',
                length: '64',
                isNullable: false
            }),
            new TableColumn({
                name: 'exam_subtype',
                type: 'varchar',
                length: '64',
                isNullable: false
            }),
        ]);

    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumns(TABLE_NAME, ['exam_type', 'exam_subtype']);
    }

}
