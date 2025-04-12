import { SelectorOption } from "@/shared/utils/bases/base.selector";

const stubExamSelector = (id: number): SelectorOption<number> => ({
    key: id,
    label: 'my-stub-key'
});

export const mockExamOptions = () => [1, 2, 3, 4, 5].map(stubExamSelector);