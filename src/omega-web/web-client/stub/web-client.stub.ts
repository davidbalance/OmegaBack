import { WebClient } from "../dtos/response/web-client.base.dto";

const stubResource = () => ({
    label: "Stub label",
    address: "Stub address"
});

const stubWebClient = (id: number): WebClient => ({
    logo: {
        name: "Stub name"
    },
    resources: Array(10).map(stubResource)
});


export const mockWebClient = () => stubWebClient(1);
export const mockWebClients = () => Array(10).map(stubWebClient);