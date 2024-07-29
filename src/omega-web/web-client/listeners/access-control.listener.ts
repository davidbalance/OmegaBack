import { Inject, Injectable } from "@nestjs/common";
import { WebClientRepository } from "../web-client.repository";
import { OnEvent } from "@nestjs/event-emitter";
import { WebResourceService } from "@/omega-web/web-resource/web-resource.service";
import { AccessControlEvent, AccessControlUpdateEvent } from "@/shared/events";

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