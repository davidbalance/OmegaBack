import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ORDERS' })
@Index(['patient', 'corporativeGroup', 'company', 'branch'])
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ORDER_ID' })
    public id: number;

    @Index()
    @Column({ name: 'userDni', type: 'varchar', length: 10, nullable: false })
    public patient: string;

    @Column({ name: 'corporativeGroupId', type: 'int', nullable: false })
    public corporativeGroup: number;

    @Column({ name: 'companyRuc', type: 'varchar', length: 13, nullable: false })
    public company: string;

    @Column({ name: 'branchId', type: 'int', nullable: false })
    public branch: number;

    @Column({ name: 'processName', type: 'varchar', length: 64, nullable: false })
    public process: string;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];
}
