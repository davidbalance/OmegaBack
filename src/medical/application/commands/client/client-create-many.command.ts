import { CommandHandlerAsync } from "@shared/shared/application";
import { ClientCreateCommand, ClientCreateCommandPayload } from "./client-create.command";

export type ClientCreateManyCommandPayload = {
    data: ClientCreateCommandPayload[];
};
export interface ClientCreateManyCommand extends CommandHandlerAsync<ClientCreateManyCommandPayload, void> { }

export class ClientCreateManyCommandImpl implements ClientCreateManyCommand {
    constructor(
        private readonly command: ClientCreateCommand
    ) { }

    async handleAsync(value: ClientCreateManyCommandPayload): Promise<void> {
        const take: number = 50;
        for (let i = 0; i < value.data.length; i += take) {
            const data = value.data.slice(i, i + take);

            const promises = data.map(async (e) => {
                try {
                    await this.command.handleAsync(e);
                } catch (error) {
                    console.error(error.message);
                }
            });

            await Promise.all(promises);
        }
    }
}