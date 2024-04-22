import { CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Base class for entities
 * @template K Primary key type
 */
export abstract class AbstractEntity<K> {
    /**
     * Primary key
     */
    public abstract id: K;

    @CreateDateColumn({ name: 'create_at' })
    public createAt: Date;
    @UpdateDateColumn({ name: 'update_at' })
    public updateAt: Date;
}