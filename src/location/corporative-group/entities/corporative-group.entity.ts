import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { CorporativeGroupExternalKey } from "../corporative-group-external-key/entities/corporative-group-external-key.entity";

@Entity({ name: 'LO_CORPORATIVE_GROUPS' })
export class CorporativeGroup extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'corporativeGroupId' })
    public id: number;

    @Index('cg-name-idx', { unique: true })
    @Column({ name: 'corporativeGroupName', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @Column({ name: 'corporativeGroupStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Company, company => company.corporativeGroup, { eager: false })
    public companies: Company[]

    @OneToOne(() => CorporativeGroupExternalKey, { eager: false, nullable: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'externalKey' })
    public externalKey: CorporativeGroupExternalKey;
}
