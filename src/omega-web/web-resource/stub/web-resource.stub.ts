import { WebResource } from "../dtos/response/web-resource.base.dto";

const stubWebResource = (id: number): WebResource => ({
    id: id,
    name: "Stub name",
    label: "Stub label",
    address: "Stub address",
    icon: "stub",
    status: true
});

export const mockWebResource = () => stubWebResource(1);
export const mockWebResources = () => Array(10).map(stubWebResource);