import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateMedicalEmailTable1720468698014 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_m_email',
            columns: [
                {
                    name: 'medical_email_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'medical_email_email',
                    type: 'varchar',
                    length: '128',
                    isNullable: false
                },
                {
                    name: 'medical_email_default',
                    type: 'boolean',
                    default: false,
                    isNullable: false
                },
                {
                    name: 'medical_client_id',
                    type: 'int'
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                },
                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP'
                }
            ]
        }), true);

        await queryRunner.createIndex('tbl_m_email', new TableIndex({
            name: 'email_client_idx',
            columnNames: ['medical_email_email', 'medical_client_id'],
            isUnique: true
        }));

        await queryRunner.createForeignKey('tbl_m_email', new TableForeignKey({
            columnNames: ['medical_client_id'],
            referencedColumnNames: ['medical_client_id'],
            referencedTableName: 'tbl_m_client',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_m_email', 'FK_tbl_m_email_medical_client_id');
        await queryRunner.dropIndex('tbl_m_email', 'email_client_idx');
        await queryRunner.dropTable('tbl_m_email');
    }

}
