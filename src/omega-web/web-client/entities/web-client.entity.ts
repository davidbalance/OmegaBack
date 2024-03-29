
import { WebLogo } from "@/omega-web/web-logo/entities/web-logo.entity";
import { WebResource } from "@/omega-web/web-resource/entities/web-resource.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'WEB_CLIENT' })
export class WebClient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'clientId' })
    public id: number;

    @Column({ name: 'userId', type: 'int' })
    public user: number;

    @ManyToMany(() => WebResource, { eager: true })
    @JoinTable({
        name: 'WEB_CLIENT_RESOURCE',
        joinColumn: { name: 'clientId', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'resourceId', referencedColumnName: 'id' },
    })
    public resources: WebResource[];

    @ManyToOne(() => WebLogo, logo => logo.clients, { eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'logoId' })
    public logo: WebLogo;
}
