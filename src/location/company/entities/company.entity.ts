import { Branch } from "src/location/branch/entities/branch.entity";
import { CorporativeGroup } from "src/location/corporative-group/entities/corporative-group.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'COMPANIES' })
export class Company extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'companyId' })
    public id: number;

    @Column({ name: 'companyRuc', type: 'varchar', length: 13, nullable: false, unique: true })
    public ruc: string;

    @Column({ name: 'companyName', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'companyAddress', type: 'varchar', length: 128, nullable: false })
    public address: string;

    @Column({ name: 'companyPhone', type: 'varchar', length: 16, nullable: false })
    public phone: string;

    @Column({ name: 'companyStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => CorporativeGroup, group => group.companies, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'corporativeGroupId' })
    public corporativeGroup: CorporativeGroup;

    @OneToMany(() => Branch, branch => branch.company, { eager: false })
    public branches: Branch[];
}