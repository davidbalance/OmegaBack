import { WebResourceEntity } from "@/omega-web/web-resource/entities/web-resource.entity";
import { WebClientEntity } from "../entities/web-client.entity";

const stubResource = (id: number): WebResourceEntity => ({
    id: id,
    name: "Stub resource",
    label: "Stub label",
    address: "Stub address",
    icon: "test",
    show: false,
    status: false,
    createAt: new Date(),
    updateAt: new Date()
});

const stubWebClientEntity = (id: number): WebClientEntity => ({
    id: id,
    user: 1,
    resources: Array(10).map(stubResource),
    logo: {
        id: 1,
        name: "test",
        clients: [],
        createAt: new Date(),
        updateAt: new Date()
    },
    createAt: new Date(),
    updateAt: new Date()
});


export const mockWebClientEntity = () => stubWebClientEntity(1);
export const mockWebClientEntities = () => Array(10).map(stubWebClientEntity);