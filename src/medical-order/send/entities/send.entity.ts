import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'SEND' })
export class Send extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: "SEND_ID" })
    public id: number;
    @Column({ name: "SEND_NAME", type: 'varchar', length: 256, nullable: false })
    public name: string;
    @Column({ name: "SEND_TO", type: 'varchar', length: 256, nullable: false })
    public to: string;
}
