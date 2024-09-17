import { UserEntity } from "../entities/user.entity";

const stubUserEntity = (id: number): UserEntity => ({
    id: id,
    dni: "1234567890",
    email: "test@omega.com",
    name: "Stub name",
    lastname: "Stub lastname",
    hasCredential: true,
    dniType: "dni",
    status: true,
    extraAttributes: [],
    createAt: new Date(),
    updateAt: new Date()
});

export const mockUserEntity = () => stubUserEntity(1);
export const mockUserEntities = () => Array(10).map(stubUserEntity);