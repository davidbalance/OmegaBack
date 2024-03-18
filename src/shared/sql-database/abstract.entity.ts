import { BeforeUpdate, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

/**
 * Base class for entities
 * @template K Primary key type
 */
export abstract class AbstractEntity<K> {
    /**
     * Primary key
     */
    public abstract id: K;

    @CreateDateColumn()
    public createAt: Date;
    @UpdateDateColumn()
    public updateAt: Date;
}