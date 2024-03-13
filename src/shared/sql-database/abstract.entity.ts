import { BeforeUpdate, Column } from "typeorm";

export abstract class AbstractEntity<K> {
    public abstract id: K;

    @Column({ name: "CREATE_AT", type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public createAt: Date;
    @Column({ name: 'UPDATE_AT', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', nullable: false })
    public updateAt: Date;

    @BeforeUpdate()
    updatedAt = () => this.updateAt = new Date();

}