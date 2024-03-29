import { AbstractEntity } from "@/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'WEB_RESOURCES' })
export class WebResource extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'resourceId' })
    public id: number;

    @Column({ name: 'resourceName', type: 'varchar', length: 128, unique: true, nullable: false })
    public name: string;

    @Column({ name: 'resourceLabel', type: 'varchar', length: 128, unique: true, nullable: false })
    public label: string;

    @Column({ name: 'resourceAddress', type: 'varchar', length: 256, unique: true, nullable: false })
    public address: string;

    @Column({ name: 'resourceIcon', type: 'varchar', length: 64, nullable: true })
    public icon?: string;
}
