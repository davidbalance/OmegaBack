import { WebLogoEntity } from "../entities/web-logo.entity";

const stubWebLogoEntity = (id: number): WebLogoEntity => ({
    id: id,
    name: "Stub name",
    clients: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockWebLogoEntity = () => stubWebLogoEntity(1);
export const mockWebLogoEntities = () => Array(10).map(stubWebLogoEntity);