import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_corporative_external_key' })
export class CorporativeGroupExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'corporative_external_key_id' })
    public id: number;
}