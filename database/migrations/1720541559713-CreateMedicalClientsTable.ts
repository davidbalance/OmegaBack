import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_client';
const INDEX_DNI: TableIndex = new TableIndex({ name: 'idx_medical_dni', columnNames: ['medical_client_dni'], isUnique: true });

export class CreateMedicalClientsTable1720541559713 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'medical_client_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'medical_client_dni',
                        type: 'varchar',
                        length: '10',
                        isNullable: false
                    },
                    {
                        name: 'medical_client_fullname',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'medical_client_birthday',
                        type: 'date',
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_DNI);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_DNI);
        await queryRunner.dropTable(TABLE_NAME);
    }

}
