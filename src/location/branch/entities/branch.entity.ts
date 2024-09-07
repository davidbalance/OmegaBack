import { CityEntity } from "@/location/city/entities/city.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BranchExternalKeyEntity } from "./branch-external-key.entity";
import { CompanyEntity } from "@/location/company/entities/company.entity";

@Entity({ name: 'tbl_lo_branches' })
export class BranchEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'branch_id' })
    public id: number;

    @Column({ name: 'branch_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'branch_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => CompanyEntity, company => company.branches, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_company_branch', referencedColumnName: 'id', name: 'company_id' })
    public company: CompanyEntity;

    @ManyToOne(() => CityEntity, city => city.branches, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_city_branch', referencedColumnName: 'id', name: 'city_id' })
    public city: CityEntity;

    @OneToOne(() => BranchExternalKeyEntity, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_external_branch', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: BranchExternalKeyEntity;

}
