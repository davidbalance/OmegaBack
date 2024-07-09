import { AbstractEntity } from "src/shared";
import { User } from "src/user/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_u_doctors' })
export class Doctor extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'doctor_id' })
    public id: number;

    @Column({ name: 'doctor_signature', type: 'varchar', length: 256, nullable: true })
    public signature: string;

    @OneToOne(() => User, { eager: true, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_u_user_doctor', referencedColumnName: 'id', name: 'user_id' })
    public user: User;
}
