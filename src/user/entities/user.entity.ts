import { AbstractEntity } from "src/shared";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'USERS' })
export class User extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'USER_ID' })
    public id: number;
    @PrimaryColumn({ name: 'USER_DNI', type: 'varchar', length: 10, nullable: false, unique: true })
    public dni: string;
    @Column({ name: 'USER_NAME', type: 'varchar', length: 64, nullable: false })
    public name: string;
    @Column({ name: 'USER_LAST_NAME', type: 'varchar', length: 64, nullable: false })
    public lastname: string;
    @Column({ name: 'USER_LAST_STATUS', type: 'boolean', default: true, nullable: false })
    public status: boolean;
}
