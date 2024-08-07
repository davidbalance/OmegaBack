import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CorporativeGroupExternalKey } from "./corporative-group-external-key.entity";

@Entity({ name: 'tbl_lo_corporative_groups' })
@Index('idx_corporative_name', ['name'], { unique: true })
export class CorporativeGroup extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'corporative_id' })
    public id: number;

    @Column({ name: 'corporative_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'corporative_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Company, company => company.corporativeGroup, { eager: false })
    public companies: Company[]

    @OneToOne(() => CorporativeGroupExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_external_corporative', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: CorporativeGroupExternalKey;
}
