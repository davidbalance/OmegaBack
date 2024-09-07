import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_branch_external_key' })
export class BranchExternalKeyEntity extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'branch_external_key_id' })
    public id: number;
}
