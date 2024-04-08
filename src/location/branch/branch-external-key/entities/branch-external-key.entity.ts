import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'LO_BRANCH_EXTERNAL_KEY' })
export class BranchExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'branchExternalKeyId' })
    public id: number;
}
