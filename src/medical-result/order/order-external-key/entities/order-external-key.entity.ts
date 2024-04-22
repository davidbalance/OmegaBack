import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_mr_order_external_key' })
export class OrderExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'order_external_key_id' })
    public id: number;
}
