import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ROLES' })
export class Role extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'ROLE_ID' })
    public id: number;
    @Column({ name: 'ROLE_NAME', type: 'varchar', length: 64, unique: true, nullable: false })
    public name: string;
}
