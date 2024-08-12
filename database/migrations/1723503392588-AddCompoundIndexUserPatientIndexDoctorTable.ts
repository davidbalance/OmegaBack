import { MigrationInterface, QueryRunner, TableIndex, } from "typeorm";

const TABLE_NAME: string = 'tbl_u_patients';

const INDEX_PATIENT_USER = new TableIndex({
    name: 'idx_patient_user',
    columnNames: ['patient_id', 'user_id'],
    isUnique: true
})
export class AddCompoundIndexUserPatientIndexDoctorTable1723503392588 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createIndex(TABLE_NAME, INDEX_PATIENT_USER)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropIndex(TABLE_NAME, INDEX_PATIENT_USER);
    }
}
