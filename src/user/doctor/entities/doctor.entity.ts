import { AbstractEntity } from "@/shared/sql-database";
import { User } from "src/user/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: 'tbl_u_doctors' })
@Index('unique_doctor_user', ['id', 'user'], { unique: true })
export class Doctor extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'doctor_id' })
    public id: number;

    @Column({ name: 'doctor_has_file', type: 'boolean', default: false, nullable: false })
    public hasFile: boolean;

    @OneToOne(() => User, { eager: true, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_u_user_doctor', referencedColumnName: 'id', name: 'user_id' })
    public user: User;
}
