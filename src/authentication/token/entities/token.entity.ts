import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_auth_tokens' })
@Index('idx_token_key', ['key'], { unique: true })
export class Token extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'token_id' })
    public id: number;

    @Column({ name: 'token_key', type: 'int', nullable: false })
    public key: number;

    @Column({ name: 'token_used', type: 'varchar', length: 256, nullable: false, unique: true })
    public token: string;

    @Column({ name: 'token_expires_at', type: 'datetime', nullable: false })
    public expiresAt: Date;
}
