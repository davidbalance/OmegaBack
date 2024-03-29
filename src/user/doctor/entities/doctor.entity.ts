import { Result } from "src/medical-order/result/entities/result.entity";
import { AbstractEntity } from "src/shared";
import { User } from "src/user/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'DOCTORS' })
export class Doctor extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'doctorID' })
    public id: number;

    @Column({ name: 'doctorSignature', type: 'varchar', length: 256, nullable: true })
    public signature: string;

    @OneToOne(() => User, { eager: true })
    @JoinColumn({ referencedColumnName: 'id', name: 'userId' })
    public user: User;
}
