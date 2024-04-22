import { Branch } from "@/location/branch/entities/branch.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'tbl_lo_cities' })
export class City extends AbstractEntity<string> {
    @PrimaryColumn({ name: 'city_id', type: 'varchar', length: 3, unique: true })
    public id: string;

    @Column({ name: 'city_name', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => Branch, branch => branch.city, { eager: false })
    public branches: Branch[];
}
