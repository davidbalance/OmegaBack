import { MigrationInterface, QueryRunner, TableUnique } from "typeorm";

const TABLE_NAME: string = 'tbl_u_doctors';

const UNIQUE_DOCTOR_USER = new TableUnique({
    name: 'unique_doctor_user',
    columnNames: ['doctor_id', 'user_id']
})

export class AddUniqueUserDoctorIndexDoctorTable1723487731120 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createUniqueConstraint(TABLE_NAME, UNIQUE_DOCTOR_USER)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropUniqueConstraint(TABLE_NAME, UNIQUE_DOCTOR_USER);
    }

}
