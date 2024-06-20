import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalEmail } from "./medical-email.entity";
import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";

@Entity({ name: 'tbl_mr_medical_client' })
@Index('medical_dni_idx', ['dni'], { unique: true })
export class MedicalClient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'medical_client_id' })
    public id: number;

    @Column({ name: 'medical_client_dni', type: 'varchar', length: 10, nullable: false })
    public dni: string;

    @Column({ name: 'medical_client_fullname', type: 'varchar', length: 128, nullable: false })
    public fullname: string;

    @Column({ name: 'medical_client_birthday', type: 'date', nullable: false })
    public birthday: Date;

    @OneToMany(() => MedicalOrder, order => order.client, { eager: false })
    public medicalOrders: MedicalOrder[];

    @OneToMany(() => MedicalEmail, email => email.client, { eager: true })
    public email: MedicalEmail[];
}