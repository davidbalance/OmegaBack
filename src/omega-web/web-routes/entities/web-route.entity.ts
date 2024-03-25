import { AbstractEntity } from "@/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'OMEGA_WEB_ROUTES' })
export class WebRoute extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ROUTE_ID' })
    public id: number;
    @Column({ name: 'ROUTE_LABEL', type: 'varchar', length: 128, nullable: false, unique: true })
    public label: string;
    @Column({ name: 'ROUTE_LINK', type: 'varchar', length: 128, nullable: false, unique: true })
    public link: string;
    @Column({ name: 'ROUTE_ICON', type: 'varchar', length: 64, nullable: true })
    public icon?: string;
}

