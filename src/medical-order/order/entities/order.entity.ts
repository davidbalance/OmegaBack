import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ORDERS' })
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ORDER_ID' })
    public id: number;

    @Index('order-user-idx')
    @Column({ name: 'USER_DNI', type: 'varchar', length: 10, nullable: false })
    public patient: string;

    @Index('order-corporative-group-idx')
    @Column({ name: 'CORPORATIVE_GROUP_ID', type: 'int', nullable: false })
    public corporativeGroup: number;

    @Index('order-company-idx')
    @Column({ name: 'COMPANY_RUC', type: 'varchar', length: 13, nullable: false })
    public company: string;

    @Index('order-branch-idx')
    @Column({ name: 'BRANCH_ID', type: 'int', nullable: false })
    public branch: number;
    
    @Index('order-labint-idx')
    @Column({ name: 'ORDER_LABINT', type: 'int', unique: true, nullable: true })
    public labint: number;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];
}
