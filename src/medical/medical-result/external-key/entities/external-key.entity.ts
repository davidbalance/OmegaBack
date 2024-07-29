import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_m_result_external_key' })
export class ExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'result_external_key_id' })
    public id: number;
}
