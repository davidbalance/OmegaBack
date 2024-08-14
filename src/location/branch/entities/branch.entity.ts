import { City } from "@/location/city/entities/city.entity";
import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { BranchExternalKey } from "./branch-external-key.entity";
import { Company } from "@/location/company/entities/company.entity";

@Entity({ name: 'tbl_lo_branches' })
export class Branch extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'branch_id' })
    public id: number;

    @Column({ name: 'branch_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'branch_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => Company, company => company.branches, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_company_branch', referencedColumnName: 'id', name: 'company_id' })
    public company: Company;

    @ManyToOne(() => City, city => city.branches, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_city_branch', referencedColumnName: 'id', name: 'city_id' })
    public city: City;

    @OneToOne(() => BranchExternalKey, { eager: false, nullable: true })
    @JoinColumn({ foreignKeyConstraintName: 'fk_lo_external_branch', referencedColumnName: 'id', name: 'external_key' })
    public externalKey: BranchExternalKey;

}
