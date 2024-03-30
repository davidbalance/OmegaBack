import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MR_REPORTS' })
export class MedicalReport extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'reportId' })
    public id: number;

    @Column({ name: 'reportAddress', type: 'varchar', length: 256, nullable: true })
    public address: string;

    @Column({ name: 'reportContent', type: 'varchar', length: 8192, nullable: false })
    public content: string;

    @Column({ name: 'orderId', type: 'int', nullable: false })
    public order: number;

    @Column({ name: 'patientFullname', type: 'varchar', length: 128, nullable: false })
    public patientFullname: string;

    @Column({ name: 'patientAge', type: 'int', nullable: false })
    public patientAge: number;

    @Column({ name: 'patientDni', type: 'varchar', length: 10, nullable: false })
    public patientDni: string;

    @Column({ name: 'examName', type: 'varchar', length: 128, nullable: false })
    public examName: string;

    @Column({ name: 'companyName', type: 'varchar', length: 128, nullable: false })
    public companyName: string;

    @Column({ name: 'doctorDni', type: 'varchar', length: 10, nullable: false })
    public doctorDni: string;

    @Column({ name: 'doctorFullName', type: 'varchar', length: 128, nullable: false })
    public doctorFullname: string;

    @Column({ name: 'doctorSignature', type: 'varchar', length: 256, nullable: false })
    public doctorSignature: string;
}
