import { Order } from "@/medical-order/order/entities/order.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'PROCESS' })
export class Process extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'PROCESS_ID' })
    public id: number;

    @Column({ name: 'PROCESS_NAME', type: 'varchar', length: 128, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => Order, order => order.process, { eager: false })
    public orders: Order;
}
