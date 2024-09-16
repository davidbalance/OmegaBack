import { Management } from "../dtos/response/management.base.dto";

const stubManagement = (id: number): Management => ({
    id: id,
    name: "Stub name"
});

export const mockManagement = () => stubManagement(1);
export const mockManagements = () => [1, 2, 3, 4, 5].map(stubManagement);