import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lab_exam_type_external_key';
const INDEX_KEY_SOURCE: TableIndex = new TableIndex({ name: 'idx_external_key_source_key', columnNames: ['external_source', 'external_key'], isUnique: true });

export class CreateLaboratoryExamTypeExternalKeyTable1721691501595 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'external_source', type: 'varchar', length: '128', isNullable: false },
                    { name: 'external_key', type: 'varchar', length: '256', isNullable: false },
                    { name: 'exam_type_external_key_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_KEY_SOURCE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_KEY_SOURCE);

        await queryRunner.dropTable(TABLE_NAME);
    }
}
