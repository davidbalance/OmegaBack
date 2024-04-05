import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'CORPORATIVE_GROUP_EXTERNAL_KEY' })
export class CorporativeGroupExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'corporativeGroupExternalKeyId' })
    public id: number;
}