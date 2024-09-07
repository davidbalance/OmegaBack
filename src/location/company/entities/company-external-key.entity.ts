import { ExternalKeyEntity } from "@/shared/external-key";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_lo_company_external_key' })
export class CompanyExternalKeyEntity extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'company_external_key_id' })
    public id: number;
}
