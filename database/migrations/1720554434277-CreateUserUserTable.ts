import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_u_users';
const INDEX_USER_DNI: TableIndex = new TableIndex({ name: 'idx_user_dni', columnNames: ['user_dni'], isUnique: true });
const INDEX_USER_DNI_EMAIL: TableIndex = new TableIndex({ name: 'idx_user_dni_email', columnNames: ['user_dni', 'user_email'] });

export class CreateUserUserTable1720554434277 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'user_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'user_dni',
                        type: 'varchar',
                        length: '10',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'user_email',
                        type: 'varchar',
                        length: '128',
                        isNullable: true,
                        isUnique: true
                    },
                    {
                        name: 'user_name',
                        type: 'varchar',
                        length: '64',
                        isNullable: false
                    },
                    {
                        name: 'user_lastname',
                        type: 'varchar',
                        length: '64',
                        isNullable: false
                    },
                    {
                        name: 'user_has_credential',
                        type: 'boolean',
                        default: false,
                        isNullable: false
                    },
                    {
                        name: 'user_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_USER_DNI);
        await queryRunner.createIndex(TABLE_NAME, INDEX_USER_DNI_EMAIL);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_USER_DNI);
        await queryRunner.dropIndex(TABLE_NAME, INDEX_USER_DNI_EMAIL);

        await queryRunner.dropTable(TABLE_NAME);
    }

}
