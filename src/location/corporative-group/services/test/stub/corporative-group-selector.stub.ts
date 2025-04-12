import { SelectorOption } from "@/shared/utils/bases/base.selector";

const stubCorporativeGroup = (key: number): SelectorOption<number> => ({
    key: key,
    label: "my-stub-label"
});

export const mockCorporativeGroupSelectorOptions = () => [1, 2, 3, 4, 5].map(stubCorporativeGroup);