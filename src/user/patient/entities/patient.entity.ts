import { Column, Entity, Index, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "src/user/user/entities/user.entity";
import { PatientGenderEnum } from "../enums/patient.enum";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";

@Entity({ name: "tbl_u_patients" })
@Index('idx_patient_user', ['user'], { unique: true })
export class Patient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'patient_id' })
    public id: number;

    @Column({ name: 'patient_gender', type: 'enum', enum: PatientGenderEnum, nullable: false })
    public gender: PatientGenderEnum;

    @Column({ name: 'patient_birthday', type: 'date', nullable: false })
    public birthday: Date;

    @OneToOne(() => User, { eager: true, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_u_user_patient', referencedColumnName: 'dni', name: 'user_dni' })
    public user: User;
}
