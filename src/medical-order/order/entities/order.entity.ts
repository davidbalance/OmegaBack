import { Process } from "@/medical-order/process/entities/process.entity";
import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ORDERS' })
@Index(['patient', 'corporativeGroup', 'company', 'branch', 'labint'])
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ORDER_ID' })
    public id: number;

    @Index({ unique: false })
    @Column({ name: 'USER_DNI', type: 'varchar', length: 10, nullable: false })
    public patient: string;

    @Column({ name: 'CORPORATIVE_GROUP_ID', type: 'int', nullable: false })
    public corporativeGroup: number;

    @Column({ name: 'COMPANY_RUC', type: 'varchar', length: 13, nullable: false })
    public company: string;

    @Column({ name: 'BRANCH_ID', type: 'int', nullable: false })
    public branch: number;

    @Column({ name: 'ORDER_LABINT', type: 'int', unique: true, nullable: true })
    public labint: number;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];

    @ManyToOne(() => Process, process => process.orders, { eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'PROCESS_ID' })
    public process: Process;
}
