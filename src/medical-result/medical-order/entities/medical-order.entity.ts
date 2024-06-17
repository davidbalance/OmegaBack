import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { MedicalResult } from "@/medical-result/medical-result/entities/result.entity";
import { ExternalKey } from "../external-key/entities/external-key.entity";
import { MailAddress } from "../mail-address/entity/mail-address.entity";

@Entity({ name: 'tbl_mr_orders' })
@Index('order_dni_idx', ['patientDni'])
@Index('order_dni_id_idx', ['id', 'patientDni'], { unique: true })
export class MedicalOrder extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'order_id' })
    public id: number;

    @Column({ name: 'patient_dni', type: 'varchar', length: 10, nullable: false })
    public patientDni: string;

    @Column({ name: 'patient_fullname', type: 'varchar', length: 128, nullable: false })
    public patientFullname: string;

    @Column({ name: 'patient_birthday', type: 'date', nullable: false })
    public patientBirthday: Date;

    @Column({ name: 'patient_email', type: 'varchar', length: 128, nullable: false })
    public patientEmail: string;

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

    @ManyToMany(() => MailAddress, { eager: true })
    @JoinTable({
        name: 'tbl_mr_orders_email',
        joinColumn: { referencedColumnName: 'id', name: 'order_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'mail_address_id' }
    })
    public mailAddress: MailAddress[];
}
