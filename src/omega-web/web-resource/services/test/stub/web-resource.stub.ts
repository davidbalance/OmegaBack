import { WebResource } from "@/omega-web/web-resource/entities/web-resource.entity";

const stubWebResource = (id: number): WebResource => ({
    id: id,
    name: "stub-name",
    label: "Stub label",
    address: "stub/address",
    icon: "stub-icon",
    show: true,
    status: true,
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockWebResource = () => stubWebResource(1);
export const mockWebResourceArray = () => [1, 2, 3, 4, 5].map(stubWebResource);