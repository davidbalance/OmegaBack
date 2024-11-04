import { AbstractEntity } from "@/shared/sql-database/abstract.entity";
import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'tbl_m_zip_tree' })
@Index('idx_zip_tree_code', ['zipCode'])
export class ZipTree extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'zip_id' })
    public id: number;

    @Column({ name: 'zip_tree_code', type: 'varchar', length: 64, nullable: false })
    public zipCode: string;

    @Column({ name: 'zip_tree_filepath', type: 'varchar', length: 256, unique: true, nullable: false })
    public filepath: string;

    @Column({ name: 'zip_tree_owner', type: 'varchar', length: 128, nullable: false })
    public email: string;
}
