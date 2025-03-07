import { CommandHandlerAsync } from "@shared/shared/application";
import { AuthRepository } from "../../repository/auth/aggregate.repositories";
import { AuthNotFoundError } from "@omega/auth/core/domain/auth/errors/auth.errors";
import { ResourceNotFoundError } from "@omega/auth/core/domain/resource/errors/resource.errors";
import { ResourceRepository } from "../../repository/resource/model.repositories";

export type AuthAddResourcesCommandPayload = {
    authId: string;
    resourceIds: string[];
};
export class AuthAddResourcesCommand implements CommandHandlerAsync<AuthAddResourcesCommandPayload, void> {
    constructor(
        private readonly repository: AuthRepository,
        private readonly resourceRepository: ResourceRepository
    ) { }

    async handleAsync(value: AuthAddResourcesCommandPayload): Promise<void> {
        const auth = await this.repository.findOneAsync({ filter: [{ field: 'id', operator: 'eq', value: value.authId }] });
        if (!auth) throw new AuthNotFoundError(value.authId);

        const newResources = value.resourceIds.filter(e => !auth.resources.includes(e));
        const removedResources = auth.resources.filter(e => !value.resourceIds.includes(e));
        const existsAccess = await this.resourceRepository.findManyAsync({ filter: [{ field: 'resourceId', operator: 'in', value: Array.from(new Set(newResources)) }] });
        for (const id of newResources) {
            if (!existsAccess.some(e => e.resourceId === id)) throw new ResourceNotFoundError(id);
            auth.addResource(id);
        }
        for (const id of removedResources) {
            auth.removeResource(id);
        }

        await this.repository.saveAsync(auth);
    }
}