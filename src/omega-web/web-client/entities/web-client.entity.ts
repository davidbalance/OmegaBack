import { WebRoute } from "@/omega-web/web-routes/entities/web-route.entity";
import { AbstractEntity } from "@/shared";
import { Column, Entity, Index, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'OMEGA_WEB_CLIENT' })
export class WebClient extends AbstractEntity<number> {
    @PrimaryGeneratedColumn('increment', { name: 'CLIENT_ID' })
    public id: number;

    @Index('web-client-user-idx')
    @Column({ name: 'CLIENT_USER', type: 'int' })
    public user: number;

    @ManyToMany(() => WebRoute, { eager: true })
    @JoinTable({
        name: 'OMEGA_CLIENT_ROUTE',
        joinColumn: { name: 'CLIENT_ID', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'ROUTE_ID', referencedColumnName: 'id' },
    })
    public routes: WebRoute[];
}
