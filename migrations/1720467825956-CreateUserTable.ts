import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

export class CreateUserTable1720467825956 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_u_users',
            columns: [
                {
                    name: 'user_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'user_dni',
                    type: 'varchar',
                    length: '10',
                    isUnique: true,
                    isNullable: false
                },
                {
                    name: 'user_email',
                    type: 'varchar',
                    length: '128',
                    isUnique: true,
                    isNullable: true
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

        await queryRunner.createIndex('tbl_u_users', new TableIndex({
            name: 'user_dni_idx',
            columnNames: ['user_dni'],
            isUnique: true
        }));

        await queryRunner.createIndex('tbl_u_users', new TableIndex({
            name: 'user_dni_email_idx',
            columnNames: ['user_dni', 'user_email']
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex('tbl_u_users', 'user_dni_email_idx');
        await queryRunner.dropIndex('tbl_u_users', 'user_dni_idx');
        await queryRunner.dropTable('tbl_u_users');
    }

}
