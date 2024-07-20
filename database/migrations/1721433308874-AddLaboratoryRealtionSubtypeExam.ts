import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey } from "typeorm";

const TABLE_NAME = 'tbl_lab_exams';

const FK_LAB_SUBTYPE_EXAM: TableForeignKey = new TableForeignKey({
    name: 'fk_lab_subtype_exam',
    columnNames: ['exam_subtype_id'],
    referencedColumnNames: ['exam_subtype_id'],
    referencedTableName: 'tbl_lab_exam_subtype'
});

export class AddLaboratoryRealtionSubtypeExam1721433308874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, new TableColumn({
            name: 'exam_subtype_id',
            type: 'int',
            isNullable: false,
        }));

        await queryRunner.createForeignKey(TABLE_NAME, FK_LAB_SUBTYPE_EXAM);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LAB_SUBTYPE_EXAM);
        await queryRunner.dropTable(TABLE_NAME);
    }

}
