import { Company } from "src/location/company/entities/company.entity";
import { State } from "src/location/state/entities/state.entity";
import { AbstractEntity } from "src/shared";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'CITIES' })
export class City extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'CITY_ID' })
    public id: number;
    @Column({ name: 'CITY_NAME', type: 'varchar', length: 64, nullable: false, unique: true })
    public name: string;

    @ManyToOne(() => State, state => state.cities, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'STATE_ID' })
    public state: State;
}
