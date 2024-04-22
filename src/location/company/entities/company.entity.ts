import { Branch } from "src/location/branch/entities/branch.entity";
import { CorporativeGroup } from "src/location/corporative-group/entities/corporative-group.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyExternalKey } from "../company-external-key/entities/company-external-key.entity";

@Entity({ name: 'tbl_lo_companies' })
export class Company extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'company_id' })
    public id: number;

    @Index('company_ruc_idx', { unique: true })
    @Column({ name: 'company_ruc', type: 'varchar', length: 13, nullable: false, unique: true })
    public ruc: string;

    @Column({ name: 'company_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'company_address', type: 'varchar', length: 128, nullable: false })
    public address: string;

    @Column({ name: 'company_phone', type: 'varchar', length: 16, nullable: false })
    public phone: string;

    @Column({ name: 'company_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => CorporativeGroup, group => group.companies, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'corporative_id' })
    public corporativeGroup: CorporativeGroup;

    @OneToMany(() => Branch, branch => branch.company, { eager: false })
    public branches: Branch[];

    @OneToOne(() => CompanyExternalKey, { eager: false, nullable: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: CompanyExternalKey;
}