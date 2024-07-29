import { Branch } from "@/location/branch/entities/branch.entity";
import { AbstractEntity } from "@/shared/sql-database";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_cities' })
@Index("idx_city_name", ['name'], { unique: true })
export class City extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'city_id' })
    public id: number;

    @Column({ name: 'city_name', type: 'varchar', length: 64, nullable: false })
    public name: string;

    @OneToMany(() => Branch, branch => branch.city, { eager: false })
    public branches: Branch[];
}
