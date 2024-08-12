import { MigrationInterface, QueryRunner, TableIndex, TableUnique } from "typeorm";

const TABLE_NAME: string = 'tbl_u_doctors';

const INDEX_UNIQUE_DOCTOR_USER = new TableIndex({
    name: 'idx_doctor_user',
    columnNames: ['doctor_id', 'user_id'],
    isUnique: true
})

export class AddCompoundIndexUserDoctorIndexDoctorTable1723487731120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex(TABLE_NAME, INDEX_UNIQUE_DOCTOR_USER)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_UNIQUE_DOCTOR_USER);
    }

}
