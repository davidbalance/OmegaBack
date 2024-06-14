import { City } from "@/location/city/entities/city.entity";
import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { ExternalKey } from "../external-key/entities/external-key.entity";

@Entity({ name: 'tbl_lo_branches' })
export class Branch extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'branch_id' })
    public id: number;

    @Column({ name: 'branch_name', type: 'varchar', length: 128, nullable: false })
    public name: string;

    @Column({ name: 'branch_status', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => Company, company => company.branches, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'company_id' })
    public company: Company;

    @ManyToOne(() => City, city => city.branches, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'city_id' })
    public city: City;

    @OneToOne(() => ExternalKey, { eager: false, nullable: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'external_key' })
    public externalKey: ExternalKey;

}
