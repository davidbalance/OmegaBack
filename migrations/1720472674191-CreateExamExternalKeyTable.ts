import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateExamExternalKeyTable1720472674191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_lab_exam_external_key',
            columns: [
                {
                    name: 'exam_external_key_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                // Add columns from ExternalKeyEntity if needed
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                // Example: Add more columns as needed
            ],
        }));

        // Create indexes
        await queryRunner.createIndex('tbl_lab_exam_external_key', new TableIndex({
            name: 'idx_exam_external_key_created_at',
            columnNames: ['created_at'],
        }));

        await queryRunner.createIndex('tbl_lab_exam_external_key', new TableIndex({
            name: 'idx_exam_external_key_updated_at',
            columnNames: ['updated_at'],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('tbl_lab_exam_external_key', 'idx_exam_external_key_created_at');
        await queryRunner.dropIndex('tbl_lab_exam_external_key', 'idx_exam_external_key_updated_at');
        await queryRunner.dropTable('tbl_lab_exam_external_key');
    }

}
