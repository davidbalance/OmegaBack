import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_email';
const INDEX_EMAIL_CLIENT: TableIndex = new TableIndex({ name: 'idx_medical_dni', columnNames: ['medical_email_email', 'medical_client_id'], isUnique: true });

const FK_M_CLIENT_EMAIL: TableForeignKey = new TableForeignKey({
    name: 'fk_m_client_email',
    columnNames: ['medical_client_id'],
    referencedColumnNames: ['medical_client_id'],
    referencedTableName: 'tbl_m_client'
});

export class CreateMedicalEmailTable1720541606851 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'medical_email_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
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
                        type: 'int',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_EMAIL_CLIENT);

        await queryRunner.createForeignKey(TABLE_NAME, FK_M_CLIENT_EMAIL)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_EMAIL_CLIENT);
        await queryRunner.dropTable(TABLE_NAME);
    }

}
