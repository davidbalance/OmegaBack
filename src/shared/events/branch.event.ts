import { PostBranchExternalRequestDto } from "@/location/branch/dtos/request/post.branch-external.request.dto";

export const BranchEvent = {
    EXTERNAL_BRANCH: 'branch.external.create',
}

export class BranchExternalCreateEvent {
    constructor(
        public readonly source: string,
        public readonly key: string,
        public readonly data: PostBranchExternalRequestDto
    ) { }
}