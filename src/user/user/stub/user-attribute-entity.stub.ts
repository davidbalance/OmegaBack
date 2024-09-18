import { UserExtraAttributeEntity } from "../entities/user-extra-attribute.entity";

const stubUserAttributeEntity = (id: number): UserExtraAttributeEntity => ({
    id: id,
    user: { id: 1 } as any,
    name: "Test attribute",
    value: "Test value",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockUserAttributeEntity = () => stubUserAttributeEntity(1);
export const mockUserAttributeEntities = () => Array(10).map(stubUserAttributeEntity);