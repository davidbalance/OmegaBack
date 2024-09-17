import { WebResource } from "../dtos/response/web-resource.base.dto";
import { WebResourceEntity } from "../entities/web-resource.entity";

const stubWebResourceEntity = (id: number): WebResourceEntity => ({
    id: id,
    name: "Stub name",
    label: "Stub label",
    address: "Stub address",
    icon: "stub",
    status: true,
    show: false,
    createAt: new Date(),
    updateAt: new Date()
});

export const mockWebResourceEntity = () => stubWebResourceEntity(1);
export const mockWebResourceEntities = () => Array(10).map(stubWebResourceEntity);