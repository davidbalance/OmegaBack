import { Send } from "src/medical-order/send/entities/send.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RESULTS" })
export class Result extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "RESULT_ID" })
    public id: number;
    @Column({ name: 'RESULT_FILENAME', type: 'varchar', length: 256, nullable: false })
    public filename: string;
    @Column({ name: 'RESULT_PATH', type: 'varchar', length: 256, nullable: false })
    public path: string;

    @ManyToMany(() => Send, { eager: false })
    @JoinTable({
        name: 'RESULTS_SENDS',
        joinColumn: { referencedColumnName: 'id', name: 'RESULT_ID' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'SEND_ID' },
    })
    public sends: Send;
}
