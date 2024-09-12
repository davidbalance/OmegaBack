import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyExternalKeyEntity } from "./company-external-key.entity";
import { CorporativeGroupEntity } from "@/location/corporative-group/entities/corporative-group.entity";
import { BranchEntity } from "@/location/branch/entities/branch.entity";

@Entity({ name: 'tbl_lo_companies' })
@Index('idx_company_ruc', ['ruc'], { unique: true })
export class CompanyEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'company_id' })
    public id: number;

    @Column({ name: 'company_ruc', type: 'varchar', length: 13, nullable: false, unique: true })
    public ruc: string;

    @Column({ name: 'company_name', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'company_address', type: 'varchar', length: 128, nullable: false })
    public address: string;

    @Column({ name: 'company_phone', type: 'varchar', length: 16, nullable: false })
    public phone: string;

    @Column({ name: 'company_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => BranchEntity, branch => branch.company, { eager: false })
    public branches: BranchEntity[];

    @ManyToOne(() => CorporativeGroupEntity, group => group.companies, { eager: false, nullable: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'corporative_id' })
    public corporativeGroup: CorporativeGroupEntity;

    @OneToOne(() => CompanyExternalKeyEntity, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_external_company', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: CompanyExternalKeyEntity;
}