import { MigrationInterface, QueryRunner, Table, TableIndex } from "typeorm";

const TABLE_NAME: string = 'tbl_m_zip_tree';
const IDX_ZIP_TREE_CODE: TableIndex = new TableIndex({ name: 'idx_zip_tree_code', columnNames: ['zip_tree_code'], isUnique: true });

export class CreateZipTree1730566888609 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: TABLE_NAME,
                columns: [
                    { name: 'create_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                    { name: 'update_at', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                    { name: 'zip_id', type: 'int', isPrimary: true, isGenerated: true, generationStrategy: 'increment' },
                    {
                        name: 'zip_tree_code',
                        type: 'varchar',
                        length: '64',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'zip_tree_filepath',
                        type: 'varchar',
                        length: '256',
                        isUnique: true,
                        isNullable: false
                    },
                    {
                        name: 'zip_tree_owner',
                        type: 'varchar',
                        length: '128',
                        isNullable: false
                    },
                ],
            }),
            true,
        );

        await queryRunner.createIndex(TABLE_NAME, IDX_ZIP_TREE_CODE);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, IDX_ZIP_TREE_CODE);
        
        await queryRunner.dropTable(TABLE_NAME);
    }

}
