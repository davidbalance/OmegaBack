import { City } from "@/location/city/entities/city.entity";
import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'BRANCHES' })
export class Branch extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'BRANCH_ID' })
    public id: number;

    @Column({ name: 'BRANCH_NAME', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'BRANCH_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => Company, company => company.branches, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'COMPANY_ID' })
    public company: Company;

    @ManyToOne(() => City, city => city.branches, { eager: false })
    @JoinColumn({ name: 'CITY_ID', referencedColumnName: 'id' })
    public city: City;
}
