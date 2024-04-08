import { Branch } from "@/location/branch/entities/branch.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity({ name: 'LO_CITIES' })
export class City extends AbstractEntity<string> {
    @PrimaryColumn({ name: 'cityId', type: 'varchar', length: 3, unique: true })
    public id: string;

    @Column({ name: 'cityName', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => Branch, branch => branch.city, { eager: false })
    public branches: Branch[];
}
