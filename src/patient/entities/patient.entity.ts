import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { PatientGenderEnum } from "../common/enums";
import { AbstractEntity } from "src/shared";
import { Order } from "src/medical-order/order/entities/order.entity";

@Entity({ name: "PATIENTS" })
export class Patient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'PATIENT_ID' })
    public id: number;
    @Column({ name: 'PATIENT_NAME', type: 'enum', enum: PatientGenderEnum, nullable: false })
    public gender: PatientGenderEnum;
    @Column({ name: 'PATIENT_BIRTHDAY', type: 'date', nullable: false })
    public birthday: Date;
    @Column({ name: 'PATIENT_AGE', type: 'int', nullable: false })
    public age: number;

    @OneToMany(() => Order, order => order.patient, { eager: false })
    public orders: Order[];
}
