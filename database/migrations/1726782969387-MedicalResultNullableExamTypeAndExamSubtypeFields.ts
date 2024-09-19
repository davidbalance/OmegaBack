import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

const TABLE_NAME: string = 'tbl_m_results';

export class MedicalResultNullableExamTypeAndExamSubtypeFields1726782969387 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns(TABLE_NAME, [
            {
                oldColumn: new TableColumn({
                    name: 'exam_type',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                }),
                newColumn: new TableColumn({
                    name: 'exam_type',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                })
            },
            {
                oldColumn: new TableColumn({
                    name: 'exam_subtype',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                }),
                newColumn: new TableColumn({
                    name: 'exam_subtype',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                }),
            }
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumns(TABLE_NAME, [
            {
                oldColumn: new TableColumn({
                    name: 'exam_type',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                }),
                newColumn: new TableColumn({
                    name: 'exam_type',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                })
            },
            {
                oldColumn: new TableColumn({
                    name: 'exam_subtype',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                }),
                newColumn: new TableColumn({
                    name: 'exam_subtype',
                    type: 'varchar',
                    length: '64',
                    isNullable: false
                }),
            }
        ])
    }

}
