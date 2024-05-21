import { Branch } from "@/location/branch/entities/branch.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, Index, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_cities' })
@Index("city_name_idx", ['name'], { unique: true })
export class City extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'city_id' })
    public id: number;

    @Column({ name: 'city_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => Branch, branch => branch.city, { eager: false })
    public branches: Branch[];
}
