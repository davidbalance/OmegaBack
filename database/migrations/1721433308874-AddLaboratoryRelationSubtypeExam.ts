import { MigrationInterface, QueryRunner, TableColumn, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME = 'tbl_lab_exams';

const INDEX_UNIQUE_EXAM_SUBTYPE = 'idx_unq_exam_subtype';

const FK_LAB_SUBTYPE_EXAM: TableForeignKey = new TableForeignKey({
    name: 'fk_lab_subtype_exam',
    columnNames: ['exam_subtype_id'],
    referencedColumnNames: ['exam_subtype_id'],
    referencedTableName: 'tbl_lab_exam_subtype'
});

export class AddLaboratoryRelationSubtypeExam1721433308874 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(TABLE_NAME, new TableColumn({
            name: 'exam_subtype_id',
            type: 'int',
            isNullable: false,
        }));

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: INDEX_UNIQUE_EXAM_SUBTYPE,
            columnNames: ['exam_subtype_id', 'exam_name'],
            isUnique: true
        }));

        await queryRunner.createForeignKey(TABLE_NAME, FK_LAB_SUBTYPE_EXAM);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LAB_SUBTYPE_EXAM);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_UNIQUE_EXAM_SUBTYPE);
        await queryRunner.dropColumn(TABLE_NAME, 'exam_subtype_id');
    }

}
