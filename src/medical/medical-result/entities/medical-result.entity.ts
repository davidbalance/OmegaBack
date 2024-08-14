import { MedicalOrder } from "@/medical/medical-order/entities/medical-order.entity";
import { MedicalReport } from "@/medical/medical-report/entities/medical-report.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Entity, Index, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn, OneToOne } from "typeorm";
import { MedicalResultDisease } from "./medical-result-disease.entity";
import { MedicalResultExternalKey } from "./medical-result-external-key.entity";
import { MedicalResultSendAttribute } from "./medical-result-send-attribute.entity";

@Entity({ name: "tbl_m_results" })
@Index('idx_result_doctor_dni', ['doctorDni'])
export class MedicalResult extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "result_id" })
    public id: number;

    @Column({ name: 'result_file_path', type: 'varchar', length: 512, nullable: true, unique: true })
    public filePath?: string;

    @Column({ name: 'result_has_file', type: 'boolean', default: false, nullable: false })
    public hasFile: boolean;

    @Column({ name: 'exam_type', type: 'varchar', length: 64, nullable: false })
    public examType: string;

    @Column({ name: 'exam_subtype', type: 'varchar', length: 64, nullable: false })
    public examSubtype: string;

    @Column({ name: 'exam_name', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'doctor_dni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctor_fullname', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctor_signature', type: 'varchar', length: 512, nullable: false })
    public doctorSignature: string;

    @OneToMany(() => MedicalResultDisease, morbidity => morbidity.result, { eager: true, nullable: true })
    public diseases?: MedicalResultDisease[];

    @ManyToOne(() => MedicalOrder, order => order.results, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_order_result', referencedColumnName: 'id', name: 'order_id' })
    public order: MedicalOrder;

    @OneToOne(() => MedicalReport, { eager: true, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_report_result', referencedColumnName: 'id', name: 'report_id' })
    public report: MedicalReport;

    @OneToOne(() => MedicalResultExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_m_external_result', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: MedicalResultExternalKey;

    @OneToMany(() => MedicalResultSendAttribute, value => value.result, { eager: false })
    public sendAttributes: MedicalResultSendAttribute[];
}
