import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_m_order_external_key' })
export class ExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'order_external_key_id' })
    public id: number;
}
