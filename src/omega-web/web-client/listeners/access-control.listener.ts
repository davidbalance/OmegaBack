import { WebResourceService } from "@/omega-web/web-resource/services/web-resource.service";
import { AccessControlEvent, AccessControlUpdateEvent } from "@/shared/events";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { WebClientRepository } from "../repositories/web-client.repository";

@Injectable()
export class AccessControlListener {
    constructor(
        @Inject(WebClientRepository) private readonly repository: WebClientRepository,
        @Inject(WebResourceService) private readonly resourceService: WebResourceService
    ) { }

    @OnEvent(AccessControlEvent.UPDATE)
    async updateClientResources({ updateEvent }: AccessControlUpdateEvent): Promise<void> {
        const { id, resources } = updateEvent;
        const foundResources = await this.resourceService.findInNames(resources);

        await this.repository.findOneAndUpdate({ user: id }, { resources: foundResources });
    }
}