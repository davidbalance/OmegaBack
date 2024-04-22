
import { WebLogo } from "@/omega-web/web-logo/entities/web-logo.entity";
import { WebResource } from "@/omega-web/web-resource/entities/web-resource.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ow_clients' })
export class WebClient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'client_id' })
    public id: number;

    @Index('user_idx', { unique: true })
    @Column({ name: 'user_id', type: 'int', unique: true })
    public user: number;

    @ManyToMany(() => WebResource, { eager: true })
    @JoinTable({
        name: 'tbl_ow_clients_resources',
        joinColumn: { referencedColumnName: 'id', name: 'client_id' },
        inverseJoinColumn: { referencedColumnName: 'id', name: 'resource_id' },
    })
    public resources: WebResource[];

    @ManyToOne(() => WebLogo, logo => logo.clients, { eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'logo_id' })
    public logo: WebLogo;
}
