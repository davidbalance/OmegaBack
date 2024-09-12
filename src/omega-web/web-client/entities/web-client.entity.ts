
import { WebLogoEntity } from "@/omega-web/web-logo/entities/web-logo.entity";
import { WebResourceEntity } from "@/omega-web/web-resource/entities/web-resource.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ow_clients' })
@Index('idx_client_user', ['user'], { unique: true })
export class WebClientEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'client_id' })
    public id: number;

    @Column({ name: 'user_id', type: 'int', unique: true })
    public user: number;

    @ManyToMany(() => WebResourceEntity, { eager: true })
    @JoinTable({
        name: 'tbl_ow_clients_resources',
        joinColumn: { foreignKeyConstraintName: 'fk_ow_client', referencedColumnName: 'id', name: 'client_id' },
        inverseJoinColumn: { foreignKeyConstraintName: 'fk_ow_resource', referencedColumnName: 'id', name: 'resource_id' },
    })
    public resources: WebResourceEntity[];

    @ManyToOne(() => WebLogoEntity, logo => logo.clients, { eager: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_ow_logo_client', referencedColumnName: 'id', name: 'logo_id' })
    public logo: WebLogoEntity;
}
