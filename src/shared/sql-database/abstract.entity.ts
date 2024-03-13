import { BeforeUpdate, Column } from "typeorm";

/**
 * Base class for entities
 * @template K Primary key type
 */
export abstract class AbstractEntity<K> {
    /**
     * Primary key
     */
    public abstract id: K;

    @Column({ name: "CREATE_AT", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public createAt: Date;
    @Column({ name: 'UPDATE_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public updateAt: Date;

    @BeforeUpdate()
    private updatedAt = () => this.updateAt = new Date();

}