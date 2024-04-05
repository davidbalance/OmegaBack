import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ORDER_EXTERNAL_KEY' })
export class OrderExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'orderExternalKey' })
    public id: number;
}
