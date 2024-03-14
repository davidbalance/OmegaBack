import { City } from "src/location/city/entities/city.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'STATES' })
export class State extends AbstractEntity<number>{
    @PrimaryGeneratedColumn('increment', { name: 'STATE_ID' })
    public id: number;
    @Column({ name: 'STATE_NAME', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @OneToMany(() => City, city => city.state, { eager: false })
    public cities: City;
}
