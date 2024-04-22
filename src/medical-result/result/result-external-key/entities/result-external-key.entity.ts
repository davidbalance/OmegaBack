import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_mr_result_external_key' })
export class ResultExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'result_external_key_id' })
    public id: number;
}
