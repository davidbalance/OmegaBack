import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'BRANCH_EXTERNAL_KEY' })
export class BranchExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'branchExternalKeyId' })
    public id: number;
}
