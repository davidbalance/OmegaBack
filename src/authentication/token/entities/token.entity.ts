import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TOKENS' })
export class Token extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'TOKEN_ID' })
    public id: number;
    @Column({ name: 'TOKEN_KEY', type: 'int', nullable: false, unique: true })
    public key: number;
    @Column({ name: 'TOKEN_IN_USE', type: 'varchar', length: 256, nullable: false, unique: true })
    public token: string;
}
