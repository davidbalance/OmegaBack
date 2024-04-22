import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CorporativeGroupExternalKey } from "../corporative-group-external-key/entities/corporative-group-external-key.entity";

@Entity({ name: 'tbl_lo_corporative_groups' })
export class CorporativeGroup extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'corporative_id' })
    public id: number;

    @Index('corporative_name_idx', { unique: true })
    @Column({ name: 'corporative_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'corporative_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Company, company => company.corporativeGroup, { eager: false })
    public companies: Company[]

    @OneToOne(() => CorporativeGroupExternalKey, { eager: false, nullable: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: CorporativeGroupExternalKey;
}
