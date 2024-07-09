import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_u_user_attribute';

const INDEX_EXTRA_NAME_VALUE: TableIndex = new TableIndex({ name: 'idx_extra_name_value', columnNames: ['extra_name', 'extra_value'], isUnique: false });

const FK_U_USER_ATTRIBUTE: TableForeignKey = new TableForeignKey({
    name: 'fk_u_user_attribute',
    columnNames: ['user_id'],
    referencedColumnNames: ['user_id'],
    referencedTableName: 'tbl_u_users'
});

export class CreateUserUserAttributesTableTable1720554459573 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: "extra_name", type: "varchar", length: '64', isNullable: true },
                    { name: "extra_value", type: 'varchar', length: '512', isNullable: false },
                    { name: 'user_attribute_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'user_id',
                        type: 'int',
                        isNullable: false
                    },
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_EXTRA_NAME_VALUE);

        await queryRunner.createForeignKey(TABLE_NAME, FK_U_USER_ATTRIBUTE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_U_USER_ATTRIBUTE);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_EXTRA_NAME_VALUE);

        await queryRunner.dropTable(TABLE_NAME);
    }

}
