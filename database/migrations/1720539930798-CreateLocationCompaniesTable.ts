import { MigrationInterface, QueryRunner, Table, TableForeignKey, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_lo_companies';

const INDEX_COMPANY_RUC: TableIndex = new TableIndex({ name: 'idx_company_ruc', columnNames: ['company_ruc'], isUnique: true });

const FK_LO_EXTERNAL_COMPANY: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_external_company',
    columnNames: ['external_key'],
    referencedColumnNames: ['company_external_key_id'],
    referencedTableName: 'tbl_lo_company_external_key'
});

const FK_LO_CORPORATIVE_COMPANY: TableForeignKey = new TableForeignKey({
    name: 'fk_lo_corporative_company',
    columnNames: ['corporative_id'],
    referencedColumnNames: ['corporative_id'],
    referencedTableName: 'tbl_lo_corporative_groups'
});

export class CreateLocationCompaniesTable1720539930798 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'company_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'company_ruc',
                        type: 'varchar',
                        length: '13',
                        isNullable: false,
                        isUnique: true
                    },
                    {
                        name: 'company_name',
                        type: 'varchar',
                        length: '64',
                        isNullable: false
                    },
                    {
                        name: 'company_address',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                    {
                        name: 'company_phone',
                        type: 'varchar',
                        length: '16',
                        isNullable: false
                    },
                    {
                        name: 'company_status',
                        type: 'boolean',
                        default: true,
                        isNullable: false
                    },
                    {
                        name: 'corporative_id',
                        type: 'int',
                        isNullable: false
                    },
                    {
                        name: 'external_key',
                        type: 'int'
                    }
                ]
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, INDEX_COMPANY_RUC);

        await queryRunner.createForeignKey(TABLE_NAME, FK_LO_EXTERNAL_COMPANY);
        await queryRunner.createForeignKey(TABLE_NAME, FK_LO_CORPORATIVE_COMPANY);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LO_EXTERNAL_COMPANY);
        await queryRunner.dropForeignKey(TABLE_NAME, FK_LO_CORPORATIVE_COMPANY);

        await queryRunner.dropIndex(TABLE_NAME, INDEX_COMPANY_RUC);

        await queryRunner.dropTable(TABLE_NAME);
    }

}
