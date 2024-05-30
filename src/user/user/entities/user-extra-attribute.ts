import { ExtraAttribute } from "@/shared/extra-attribute/extra-attribute.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity('tbl_u_user_attribute')
export class UserExtraAttribute extends ExtraAttribute {
    @PrimaryGeneratedColumn('increment', { name: 'user_attribute_id' })
    public id: number;

    @ManyToOne(() => User, user => user.extraAttributes, { eager: false })
    @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
    public user: User;
}