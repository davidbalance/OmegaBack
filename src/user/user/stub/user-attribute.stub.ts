import { UserAttribute } from "../dtos/response/user-attribute.base.dto";

const stubUserAttribute = (id: number): UserAttribute => ({
    id: id,
    name: "Test attribute",
    value: "Test value",
});

export const mockUserAttribute = () => stubUserAttribute(1);
export const mockUserAttributes = () => Array(10).map(stubUserAttribute);