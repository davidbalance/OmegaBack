import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_auth_credentials';

const INDEX_CREDENTIAL_EMAIL: string = 'idx_credential_email';
const INDEX_CREADENTIAL_USER: string = 'idx_credential_user';

export class CreateAuthCredentialsTable1720538021601 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'credential_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'credential_email',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'credential_password',
                        type: 'varchar',
                        length: '256',
                        isNullable: false
                    },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'credential_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: INDEX_CREDENTIAL_EMAIL,
            columnNames: ['credential_email'],
            isUnique: true
        }));

        await queryRunner.createIndex(TABLE_NAME, new TableIndex({
            name: INDEX_CREADENTIAL_USER,
            columnNames: ['user_id'],
            isUnique: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_CREDENTIAL_EMAIL);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_CREADENTIAL_USER);
        
        await queryRunner.dropTable(TABLE_NAME);
    }

}
