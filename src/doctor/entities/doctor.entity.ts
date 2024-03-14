import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'DOCTORS' })
export class Doctor extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'DOCTOR_ID' })
    public id: number;
    @Column({ name: 'DOCTOR_SIGNATURE', type: 'varchar', length: 256, nullable: true })
    public signature: string;

    @OneToMany(() => Result, result => result.doctor, { eager: false })
    public results: Result[];

    @OneToOne(() => User, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'USER_ID' })
    public user: User;
}
