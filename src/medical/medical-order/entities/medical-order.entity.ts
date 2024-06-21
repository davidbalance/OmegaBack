import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalKey } from "../external-key/entities/external-key.entity";
import { MedicalClient } from "@/medical/medical-client/entities/medical-client.entity";
import { MedicalResult } from "@/medical/medical-result/entities/result.entity";

@Entity({ name: 'tbl_mr_orders' })
export class MedicalOrder extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'order_id' })
    public id: number;

    @Column({ name: 'corporative_name', type: 'varchar', length: 64, nullable: false })
    public corporativeName: string;

    @Column({ name: 'company_ruc', type: 'varchar', length: 13, nullable: false })
    public companyRuc: string;

    @Column({ name: 'company_name', type: 'varchar', length: 64, nullable: false })
    public companyName: string;

    @Column({ name: 'branch_name', type: 'varchar', length: 128, nullable: false })
    public branchName: string;

    @Column({ name: 'process_name', type: 'varchar', length: 64, nullable: false })
    public process: string;

    @Column({ name: 'mail_status', type: 'boolean', default: false, nullable: false })
    public mailStatus: boolean;

    @OneToMany(() => MedicalResult, result => result.order, { eager: false })
    public results: MedicalResult[];

    @OneToOne(() => ExternalKey, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExternalKey;

    @ManyToOne(() => MedicalClient, client => client.medicalOrders, { eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'medical_client_id' })
    public client: MedicalClient;
}
