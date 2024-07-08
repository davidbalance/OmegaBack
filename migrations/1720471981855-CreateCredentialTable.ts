import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateCredentialTable1720471981855 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_auth_credentials',
            columns: [
                {
                    name: 'credential_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'credential_email',
                    type: 'varchar',
                    length: '128',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'credential_password',
                    type: 'varchar',
                    length: '256',
                    isNullable: false,
                },
                {
                    name: 'user_id',
                    type: 'int',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'credential_status',
                    type: 'boolean',
                    default: true,
                    isNullable: false,
                },
                {
                    name: 'create_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'update_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                },
            ],
        }), true);

        await queryRunner.createIndex('tbl_auth_credentials', new TableIndex({
            name: 'credential_email_idx',
            columnNames: ['credential_email'],
            isUnique: true,
        }));

        await queryRunner.createIndex('tbl_auth_credentials', new TableIndex({
            name: 'credential_user_idx',
            columnNames: ['user_id'],
            isUnique: true,
        }));

        await queryRunner.createForeignKey('tbl_auth_credentials', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tbl_u_users',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('tbl_auth_credentials', 'credential_email_idx');
        await queryRunner.dropIndex('tbl_auth_credentials', 'credential_user_idx');
        await queryRunner.dropTable('tbl_auth_credentials');
    }

}
