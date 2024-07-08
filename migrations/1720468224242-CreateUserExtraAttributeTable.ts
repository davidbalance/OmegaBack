import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

export class CreateUserExtraAttributeTable1720468224242 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'tbl_u_user_attribute',
            columns: [
                {
                    name: 'user_attribute_id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment'
                },
                {
                    name: 'extra_name',
                    type: 'varchar',
                    length: '64',
                    isNullable: true
                },
                {
                    name: 'extra_value',
                    type: 'varchar',
                    length: '512',
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
                },
                {
                    name: 'user_id',
                    type: 'int'
                }
            ]
        }), true);

        await queryRunner.createIndex('tbl_u_user_attribute', new TableIndex({
            name: 'extra_name_value_idx',
            columnNames: ['extra_name', 'extra_value']
        }));

        await queryRunner.createForeignKey('tbl_u_user_attribute', new TableForeignKey({
            columnNames: ['user_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'tbl_u_users',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('tbl_u_user_attribute', 'FK_tbl_u_user_attribute_user_id');
        await queryRunner.dropIndex('tbl_u_user_attribute', 'extra_name_value_idx');
        await queryRunner.dropTable('tbl_u_user_attribute');
    }

}
