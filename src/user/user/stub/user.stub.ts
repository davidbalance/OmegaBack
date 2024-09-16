import { User } from "../dtos/response/user.base.dto";

const stubUser = (id: number): User => ({
    id: id,
    dni: "1234567890",
    email: "test@omega.com",
    name: "Stub name",
    lastname: "Stub lastname",
    hasCredential: true
});

export const mockUser = () => stubUser(1);
export const mockUsers = () => Array(10).map(stubUser);