import { Branch } from "@/location/branch/entities/branch.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'CITIES' })
export class City extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'CITY_ID' })
    public id: number;

    @Column({ name: 'CITY_NAME', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => Branch, branch => branch.city, { eager: false })
    public branches: Branch[];
}
