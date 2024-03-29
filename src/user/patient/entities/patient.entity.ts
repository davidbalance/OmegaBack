import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { AbstractEntity } from "src/shared";
import { User } from "src/user/user/entities/user.entity";
import { PatientGenderEnum } from "@/user/common";

@Entity({ name: "PATIENTS" })
export class Patient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'patientId' })
    public id: number;

    @Column({ name: 'patientGender', type: 'enum', enum: PatientGenderEnum, nullable: false })
    public gender: PatientGenderEnum;

    @Column({ name: 'patientBirthday', type: 'date', nullable: false })
    public birthday: Date;

    @Column({ name: 'patientAge', type: 'int', nullable: false })
    public age: number;

    @OneToOne(() => User, { eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
    public user: User;
}
