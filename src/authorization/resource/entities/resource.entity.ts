
import { AbstractEntity, ClaimEnum } from "@/shared";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_ac_resources' })
@Index('resource_name_claim_idx', ['name', 'claim'], { unique: true })
export class Resource extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'resource_id' })
    public id: number;

    @Column({ name: 'resource_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'resource_claim', type: 'enum', enum: ClaimEnum, nullable: false })
    public claim: ClaimEnum;

    @Column({ name: 'resource_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
