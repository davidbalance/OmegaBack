import { City } from "@/location/city/entities/city.entity";
import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'LO_BRANCHES' })
export class Branch extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'branchId' })
    public id: number;

    @Column({ name: 'branchName', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @Column({ name: 'branchStatus', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @ManyToOne(() => Company, company => company.branches, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'companyId' })
    public company: Company;

    @ManyToOne(() => City, city => city.branches, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'cityId' })
    public city: City;
}
