import { User } from "../dtos/response/user.base.dto";

const stubUserEntity = (id: number): User => ({
    id: id,
    dni: "1234567890",
    email: "test@omega.com",
    name: "Stub name",
    lastname: "Stub lastname",
    hasCredential: true
});

export const mockUserEntity = () => stubUserEntity(1);
export const mockUserEntities = () => Array(10).map(stubUserEntity);