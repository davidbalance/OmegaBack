import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalKey } from "../external-key/entities/external-key.entity";
import { SendAttribute } from "../send-attribute/entities/send-attribute.entity";
import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";
import { MedicalReport } from "@/medical/medical-report/entities/medical-report.entity";

@Entity({ name: "tbl_m_results" })
@Index('result_disease_idx', ['diseaseId'])
@Index('result_disease_group_idx', ['diseaseGroupId'])
@Index('result_doctor_dni_idx', ['doctorDni'])
export class MedicalResult extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "result_id" })
    public id: number;

    @Column({ name: 'result_file_path', type: 'varchar', length: 512, nullable: true, unique: true })
    public filePath?: string;
    
    @Column({ name: 'result_has_file', type: 'boolean', default: false, nullable: false })
    public hasFile: boolean;

    @Column({ name: 'exam_name', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'disease_id', type: 'int', nullable: true })
    public diseaseId?: number;

    @Column({ name: 'disease_name', type: 'varchar', length: 128, nullable: true })
    public diseaseName?: string;

    @Column({ name: 'disease_commentary', type: 'varchar', length: 512, nullable: true })
    public diseaseCommentary?: string;

    @Column({ name: 'disease_group_id', type: 'int', nullable: true })
    public diseaseGroupId?: number;

    @Column({ name: 'disease_group_name', type: 'varchar', length: 128, nullable: true })
    public diseaseGroupName?: string;

    @Column({ name: 'doctor_dni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctor_fullname', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctor_signature', type: 'varchar', length: 512, nullable: false })
    public doctorSignature: string;

    @ManyToOne(() => MedicalOrder, order => order.results, { eager: false, nullable: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'order_id' })
    public order: MedicalOrder;

    @OneToOne(() => MedicalReport, { nullable: true, eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'report_id' })
    public report: MedicalReport;

    @OneToOne(() => ExternalKey, { eager: false, nullable: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExternalKey;

    @OneToMany(() => SendAttribute, value => value.result, { eager: false })
    public sendAttributes: SendAttribute[];
}
