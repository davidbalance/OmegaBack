import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'LO_COMPANY_EXTERNAL_KEY' })
export class CompanyExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'companyExternalKeyId' })
    public id: number;
}
