import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { UserEntity } from "@/user/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn, Index } from "typeorm";

@Entity({ name: 'tbl_u_doctors' })
@Index('idx_doctor_user', ['user'], { unique: true })
export class DoctorEntity extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'doctor_id' })
    public id: number;

    @Column({ name: 'doctor_has_file', type: 'boolean', default: false, nullable: false })
    public hasFile: boolean;

    @OneToOne(() => UserEntity, { eager: true, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_u_user_doctor', referencedColumnName: 'dni', name: 'user_dni' })
    public user: UserEntity;
}
