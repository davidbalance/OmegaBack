import { Company } from "src/location/company/entities/company.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'CORPORATIVE_GROUPS' })
export class CorporativeGroup extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'CORPORATIVE_GROUP_ID' })
    public id: number;
    @Column({ name: 'CORPORATIVE_GROUP_NAME', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;
    @Column({ name: 'CORPORATIVE_GROUP_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;

    @OneToMany(() => Company, company => company.corporativeGroup, { eager: false })
    public companies: Company[]
}
