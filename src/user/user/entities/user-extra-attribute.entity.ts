import { ExtraAttribute } from "@/shared/extra-attribute/extra-attribute.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { UserEntity } from "./user.entity";

@Entity('tbl_u_user_attribute')
export class UserExtraAttributeEntity extends ExtraAttribute {
    @PrimaryGeneratedColumn('increment', { name: 'user_attribute_id' })
    public id: number;

    @ManyToOne(() => UserEntity, user => user.extraAttributes, { eager: false, nullable: false })
    @JoinColumn({ foreignKeyConstraintName: 'fk_u_user_attribute', referencedColumnName: 'id', name: 'user_id' })
    public user: UserEntity;
}