import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TOKENS' })
export class Token extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'tokenId' })
    public id: number;

    @Index('token-user-idx')
    @Column({ name: 'tokenKey', type: 'int', nullable: false, unique: true })
    public key: number;

    @Column({ name: 'tokenUsed', type: 'varchar', length: 256, nullable: false, unique: true })
    public token: string;

    @Column({ name: 'tokenExpiresAt', type: 'datetime', nullable: false })
    public expiresAt: Date;
}
