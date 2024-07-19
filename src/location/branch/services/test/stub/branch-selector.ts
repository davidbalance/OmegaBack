import { ISelectorOption } from "@/shared/utils/bases/base.selector";

const stubBranchSelector = (id: number): ISelectorOption<number> => ({
    key: id,
    label: 'my-stub-key'
});


export const mockBranchSelectorOptions = () => [1, 2, 3, 4, 5].map(stubBranchSelector);