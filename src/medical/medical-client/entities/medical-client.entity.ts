import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { MedicalEmailEntity } from "./medical-email.entity";
import { MedicalOrderEntity } from "@/medical/medical-order/entities/medical-order.entity";

@Entity({ name: 'tbl_m_client' })
@Index('idx_medical_dni', ['dni'], { unique: true })
export class MedicalClientEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'medical_client_id' })
    public id: number;

    @Column({ name: 'medical_client_dni', type: 'varchar', length: 10, nullable: false })
    public dni: string;

    @Column({ name: 'medical_client_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'medical_client_lastname', type: 'varchar', length: 128, nullable: false })
    public lastname: string;

    @Column({ name: 'medical_client_birthday', type: 'date', nullable: false })
    public birthday: Date;

    @Column({ name: 'medical_client_gender', type: 'varchar', length: 6, nullable: false })
    public gender: string;

    @Column({ name: 'job_position_name', type: 'varchar', length: 128, nullable: true })
    public jobPositionName: string;

    @Column({ name: 'location_management_id', type: 'int', nullable: true })
    public managementId: number;

    @Column({ name: 'location_management_name', type: 'varchar', length: 128, nullable: true })
    public managementName: string;

    @Column({ name: 'location_area_id', type: 'int', nullable: true })
    public areaId: number;

    @Column({ name: 'location_area_name', type: 'varchar', length: 128, nullable: true })
    public areaName: string;

    @Column({ name: 'patient_role', type: 'varchar', length: 256, nullable: true })
    public role?: string;

    @OneToMany(() => MedicalOrderEntity, order => order.client, { eager: false })
    public medicalOrders: MedicalOrderEntity[];

    @OneToMany(() => MedicalEmailEntity, email => email.client, { eager: true })
    public email: MedicalEmailEntity[];
}