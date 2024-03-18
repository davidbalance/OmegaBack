import { Branch } from "src/location/branch/entities/branch.entity";
import { CorporativeGroup } from "src/location/corporative-group/entities/corporative-group.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'COMPANIES' })
export class Company extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'COMPANY_ID' })
    public id: number;

    @Column({ name: 'COMPANY_RUC', type: 'varchar', length: 13, nullable: false, unique: true })
    public ruc: string;

    @Column({ name: 'COMPANY_NAME', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'COMPANY_ADDRESS', type: 'varchar', length: 128, nullable: false })
    public address: string;

    @Column({ name: 'COMPANY_PHONE', type: 'varchar', length: 16, nullable: false })
    public phone: string;

    @Column({ name: 'COMPANY_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => CorporativeGroup, group => group.companies, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'CORPORATIVE_GROUP_ID' })
    public corporativeGroup: CorporativeGroup;

    @OneToMany(() => Branch, branch => branch.company, { eager: false })
    public branches: Branch[];
}