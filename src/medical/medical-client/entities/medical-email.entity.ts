import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalClient } from "./medical-client.entity";

@Entity({ name: 'tbl_mr_medical_email' })
@Index('email_client_idx', ['email', 'client'], { unique: true })
export class MedicalEmail extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'medical_email_id' })
    public id: number;

    @Column({ name: 'medical_email_email', type: 'varchar', length: 128, nullable: false })
    public email: string;

    @Column({ name: 'medical_email_default', type: 'boolean', default: false, nullable: false })
    public default: boolean;

    @ManyToOne(() => MedicalClient, client => client.email, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'medical_client_id' })
    public client: MedicalClient;
}