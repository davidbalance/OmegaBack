import { WebClient } from "@/omega-web/web-client/entities/web-client.entity";
import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ow_logos' })
export class WebLogo extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'logo_id' })
    public id: number;

    @Column({ name: 'logo_name', type: 'varchar', length: 256, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => WebClient, client => client.logo, { eager: false })
    public clients: WebClient[]
}
