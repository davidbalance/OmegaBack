import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lab_exam_subtype';
const INDEX_EXAM_SUBTYPE_NAME: TableIndex = new TableIndex({ name: 'idx_exam_subtype_name', columnNames: ['exam_subtype_name'], isUnique: true });

const FK_LAB_EXAM_TYPE_SUBTYPE: TableForeignKey = new TableForeignKey({
    name: 'fk_lab_exam_type_subtype',
    columnNames: ['exam_type_id'],
    referencedColumnNames: ['exam_type_id'],
    referencedTableName: 'tbl_lab_exam_type'
});

export class CreateLaboratoryExamSubtypeTable1721432173140 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'exam_type_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'exam_subtype_name',
                        type: 'varchar',
                        length: '64',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'exam_subtype_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    },
                    {
                        name: 'exam_type_id',
                        type: 'int',
                        isNullable: true
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_EXAM_SUBTYPE_NAME);

        await queryRunner.createForeignKey(TABLE_NAME, FK_LAB_EXAM_TYPE_SUBTYPE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LAB_EXAM_TYPE_SUBTYPE);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_EXAM_SUBTYPE_NAME);

        await queryRunner.dropTable(TABLE_NAME);
    }
}
