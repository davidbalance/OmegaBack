import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_auth_tokens' })
export class Token extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'token_id' })
    public id: number;

    @Index('token_key_idx')
    @Column({ name: 'token_key', type: 'int', nullable: false, unique: true })
    public key: number;

    @Column({ name: 'token_used', type: 'varchar', length: 256, nullable: false, unique: true })
    public token: string;

    @Column({ name: 'token_expires_at', type: 'datetime', nullable: false })
    public expiresAt: Date;
}
