import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'MR_ORDER_EXTERNAL_KEY' })
export class OrderExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'orderExternalKey' })
    public id: number;
}
