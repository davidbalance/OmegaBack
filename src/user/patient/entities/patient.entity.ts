import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "@/shared/sql-database";
import { User } from "src/user/user/entities/user.entity";
import { PatientGenderEnum } from "../enums/patient.enum";

@Entity({ name: "tbl_u_patients" })
export class Patient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'patient_id' })
    public id: number;

    @Column({ name: 'patient_gender', type: 'enum', enum: PatientGenderEnum, nullable: false })
    public gender: PatientGenderEnum;

    @Column({ name: 'patient_birthday', type: 'date', nullable: false })
    public birthday: Date;

    @OneToOne(() => User, { eager: true, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_u_user_patient', referencedColumnName: 'id', name: 'user_id' })
    public user: User;
}
