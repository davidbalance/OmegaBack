import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_job_position_external_key' })
export class JobPositionExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'job_position_external_key_id' })
    public id: number;
}
