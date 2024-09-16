import { Branch } from "../dtos/response/branch.base.dto";

const stubBranch = (id: number): Branch => ({
    id: id,
    name: "Stub branch",
    city: "Qutio"
});


export const mockBranch = () => stubBranch(1);
export const mockBranches = () => [1, 2, 3, 4, 5].map(stubBranch);