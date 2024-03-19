import { AbstractEntity } from "@/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'SENDER_STATUS' })
export class SenderStatus extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'SENDER_ID' })
    public id: number;

    @Column({ name: 'SENDER_NAME', type: 'varchar', length: 256, unique: true, nullable: false })
    public name: string;

    @Column({ name: 'SENDER_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
