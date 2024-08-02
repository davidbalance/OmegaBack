import { WebClient } from "@/omega-web/web-client/entities/web-client.entity";

const stubWebClient = (id: number): WebClient => ({
    id: id,
    user: 0,
    resources: [],
    logo: undefined,
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockWebClient = () => stubWebClient(1);
export const mockWebClients = () => [1, 2, 3, 4, 5].map(stubWebClient);