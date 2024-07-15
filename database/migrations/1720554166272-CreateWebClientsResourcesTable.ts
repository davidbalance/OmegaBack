import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

const TABLE_NAME: string = 'tbl_ow_clients_resources';

const FK_OW_CLIENT: TableForeignKey = new TableForeignKey({
    name: 'fk_ow_client',
    columnNames: ['client_id'],
    referencedColumnNames: ['client_id'],
    referencedTableName: 'tbl_ow_clients',
    onDelete: 'CASCADE',
});

const FK_OW_RESOURCE: TableForeignKey = new TableForeignKey({
    name: 'fk_ow_resource',
    columnNames: ['resource_id'],
    referencedColumnNames: ['resource_id'],
    referencedTableName: 'tbl_ow_resources',
    onDelete: 'CASCADE',
});

export class CreateWebClientsResourcesTable1720554166272 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'client_id', type: 'int', isPrimary: true },
                    { name: 'resource_id', type: 'int', isPrimary: true },
                ]
            }),
            true,
        );

        await queryRunner.createForeignKey(TABLE_NAME, FK_OW_CLIENT);
        await queryRunner.createForeignKey(TABLE_NAME, FK_OW_RESOURCE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_OW_CLIENT);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_OW_RESOURCE);
        await queryRunner.dropTable(TABLE_NAME);
    }

}
