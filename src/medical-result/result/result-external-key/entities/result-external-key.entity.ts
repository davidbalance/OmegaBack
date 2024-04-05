import { ExternalKeyEntity } from "@/shared";
import { Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'RESULT_EXTERNAL_KEY' })
export class ResultExternalKey extends ExternalKeyEntity {
    @PrimaryGeneratedColumn('increment', { name: 'resultExternalKeyId' })
    public id: number;
}
