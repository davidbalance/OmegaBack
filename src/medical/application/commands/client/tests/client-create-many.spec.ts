/* eslint-disable @typescript-eslint/unbound-method */
import { ClientCreateManyCommand, ClientCreateManyCommandImpl, ClientCreateManyCommandPayload } from "../client-create-many.command";
import { ClientCreateCommand } from "../client-create.command";

describe("ClientCreateManyCommand", () => {
    let command: jest.Mocked<ClientCreateCommand>;
    let handler: ClientCreateManyCommand;

    beforeEach(() => {
        command = {
            handleAsync: jest.fn(),
        } as unknown as jest.Mocked<ClientCreateCommand>;

        handler = new ClientCreateManyCommandImpl(command);
    });

    it("should process batches of 50 items at a time", async () => {
        const payload: ClientCreateManyCommandPayload = {
            data: new Array(150).fill({})
        };

        await handler.handleAsync(payload);

        expect(command.handleAsync).toHaveBeenCalledTimes(150);
        expect(command.handleAsync).toHaveBeenCalledWith(payload.data[0]);
        expect(command.handleAsync).toHaveBeenCalledWith(payload.data[49]);
        expect(command.handleAsync).toHaveBeenCalledWith(payload.data[50]);
    });

    it("should handle fewer than 50 items correctly", async () => {
        const payload: ClientCreateManyCommandPayload = {
            data: new Array(10).fill({})
        };

        await handler.handleAsync(payload);

        expect(command.handleAsync).toHaveBeenCalledTimes(10);
    });

    it("should handle exactly 50 items correctly", async () => {
        const payload: ClientCreateManyCommandPayload = {
            data: new Array(50).fill({})
        };

        await handler.handleAsync(payload);

        expect(command.handleAsync).toHaveBeenCalledTimes(50);
    });

    it("should catch and log errors without halting execution", async () => {
        const payload: ClientCreateManyCommandPayload = {
            data: new Array(3).fill({})
        };

        command.handleAsync.mockImplementationOnce(() => Promise.resolve())
            .mockImplementationOnce(() => Promise.reject(new Error("Error processing client")))
            .mockImplementationOnce(() => Promise.resolve());

        await handler.handleAsync(payload);

        expect(command.handleAsync).toHaveBeenCalledTimes(3);
        expect(command.handleAsync).toHaveBeenCalledWith(payload.data[0]);
        expect(command.handleAsync).toHaveBeenCalledWith(payload.data[2]);
        expect(command.handleAsync).toHaveBeenCalledWith(payload.data[1]);
    });

    it("should not process any items when the data array is empty", async () => {
        const payload: ClientCreateManyCommandPayload = {
            data: []
        };

        await handler.handleAsync(payload);

        expect(command.handleAsync).not.toHaveBeenCalled();
    });
});
