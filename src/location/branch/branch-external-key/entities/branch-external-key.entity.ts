import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_branch_external_key' })
export class BranchExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'branch_external_key_id' })
    public id: number;
}
