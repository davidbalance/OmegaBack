import { Result } from "src/medical-order/result/entities/result.entity";
import { Send } from "src/medical-order/send/entities/send.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ORDERS' })
export class Order extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ORDER_ID' })
    public id: number;
    @Column({ name: 'ORDER_FILENAME' })
    public filename: string;
    @Column({ name: 'ORDER_PATH' })
    public path: string;

    @OneToMany(() => Result, result => result.order, { eager: false })
    public results: Result[];

    @ManyToMany(() => Send, { eager: false })
    @JoinTable({
        name: 'ORDERS_SENDS',
        joinColumn: { referencedColumnName: 'id', name: 'ORDER_ID' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'SEND_ID' },
    })
    public sends: Send[];
}
