import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CorporativeGroupExternalKeyEntity } from "./corporative-group-external-key.entity";
import { CompanyEntity } from "@/location/company/entities/company.entity";

@Entity({ name: 'tbl_lo_corporative_groups' })
@Index('idx_corporative_name', ['name'], { unique: true })
export class CorporativeGroupEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'corporative_id' })
    public id: number;

    @Column({ name: 'corporative_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'corporative_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => CompanyEntity, company => company.corporativeGroup, { eager: false })
    public companies: CompanyEntity[]

    @OneToOne(() => CorporativeGroupExternalKeyEntity, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_external_corporative', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: CorporativeGroupExternalKeyEntity;
}
