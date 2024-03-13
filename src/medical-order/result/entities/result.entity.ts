import { Order } from "src/medical-order/order/entities/order.entity";
import { Send } from "src/medical-order/send/entities/send.entity";
import { Morbidity } from "src/morbidity/morbidity/entities/morbidity.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RESULTS" })
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "RESULT_ID" })
    public id: number;
    @Column({ name: 'RESULT_FILENAME', type: 'varchar', length: 256, nullable: false })
    public filename: string;
    @Column({ name: 'RESULT_PATH', type: 'varchar', length: 256, nullable: false })
    public path: string;

    @ManyToOne(() => Morbidity, morbidity => morbidity.results, { eager: false })
    @JoinColumn({ name: 'MORBIDITY_ID', referencedColumnName: 'id' })
    public morbidity: Morbidity

    @ManyToOne(() => Order, order => order.results, { eager: false })
    @JoinColumn({ name: 'ORDER_ID', referencedColumnName: 'id' })
    public order: Order;

    @ManyToMany(() => Send, { eager: false })
    @JoinTable({
        name: 'RESULTS_SENDS',
        joinColumn: { referencedColumnName: 'id', name: 'RESULT_ID' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'SEND_ID' },
    })
    public sends: Send[];
}
