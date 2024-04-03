import { WebClient } from "@/omega-web/web-client/entities/web-client.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'WEB_LOGOS' })
export class WebLogo extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'logoId' })
    public id: number;

    @Column({ name: 'logoName', type: 'varchar', length: 256, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => WebClient, client => client.logo, { eager: false })
    public clients: WebClient[]
}
