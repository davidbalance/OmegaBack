
import { AbstractEntity, ClaimEnum } from "@/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'RESOURCES' })
@Index(['name', 'claim'], { unique: true })
export class Resource extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'resourceId' })
    public id: number;

    @Column({ name: 'resourceName', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'resourceClaim', type: 'enum', enum: ClaimEnum, nullable: false })
    public claim: ClaimEnum;

    @Column({ name: 'resourceStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
