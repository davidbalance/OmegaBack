import { Company } from "src/location/company/entities/company.entity";
import { Order } from "src/medical-order/order/entities/order.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'BRANCHES' })
export class Branch extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'BRANCH_ID' })
    public id: number;
    @Column({ name: 'BRANCH_NAME', type: 'varchar', length: 64, nullable: false })
    public name: string;
    @Column({ name: 'BRANCH_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => Company, company => company.branches, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'COMPANY_ID' })
    public company: Company;

    @OneToMany(() => Order, order => order.branch, {eager: false})
    public orders: Order;
}
