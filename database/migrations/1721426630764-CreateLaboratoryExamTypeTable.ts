import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lab_exam_type';
const INDEX_EXAM_TYPE_NAME: TableIndex = new TableIndex({ name: 'idx_exam_type_name', columnNames: ['exam_type_name'], isUnique: true });

export class CreateLaboratoryExamTypeTable1721426630764 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'exam_type_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'exam_type_name',
                        type: 'varchar',
                        length: '64',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'exam_type_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_EXAM_TYPE_NAME);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_EXAM_TYPE_NAME);

        await queryRunner.dropTable(TABLE_NAME);
    }

}
