import { Record, RECORD_STATUS_COMPLETED, RECORD_STATUS_STARTED } from "../record.domain";

describe("Record Entity", () => {

    test("should create an record entity", () => {
        const record = Record.create({
            clientId: "client-id",
            metadata: { "meta": "value" },
            name: 'record',
        });

        expect(record.clientId).toBe("client-id");
        expect(record.metadata).toEqual(expect.objectContaining({ "meta": "value" }));
        expect(record.name).toBe('record');
        expect(record.status).toBe(RECORD_STATUS_STARTED);
        expect(record.filepath).toBe("");
    });

    test("should rehydrate an record entity with v1 version", () => {
        const recordId = crypto.randomUUID();
        const rehydrate = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '/path/to/record.pdf',
            name: 'record',
            status: RECORD_STATUS_STARTED,
            version: "v1",
            createAt: new Date(),
        });
        expect(rehydrate.id).toBe(recordId);
        expect(rehydrate.clientId).toBe("client-id");
        expect(rehydrate.filepath).toBe("/path/to/record.pdf");
        expect(rehydrate.metadata).toBeNull()
        expect(rehydrate.name).toBe('record');
        expect(rehydrate.status).toBe(RECORD_STATUS_STARTED);
    });

    test("should rehydrate an record entity with v2 version", () => {
        const recordId = crypto.randomUUID();
        const rehydrate = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            metadata: { "meta": "data" },
            name: 'record',
            filepath: '/path/to/record.pdf',
            status: RECORD_STATUS_STARTED,
            version: "v2",
            createAt: new Date(),
        });
        expect(rehydrate.id).toBe(recordId);
        expect(rehydrate.clientId).toBe("client-id");
        expect(rehydrate.metadata).toEqual(expect.objectContaining({
            "meta": "data"
        }));
        expect(rehydrate.name).toBe('record');
        expect(rehydrate.filepath).toBe("/path/to/record.pdf");
        expect(rehydrate.version).toBe("v2");
        expect(rehydrate.status).toBe(RECORD_STATUS_STARTED);
    });

    test("should update metadata when is v2", () => {
        const recordId = crypto.randomUUID();
        const originalMetadata = { "meta": "data" };
        const record = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            metadata: originalMetadata,
            name: 'record',
            createAt: new Date(),
            version: "v2",
            filepath: "",
            status: RECORD_STATUS_STARTED
        });

        expect(record.metadata).toEqual(originalMetadata);

        const newValue = { "new": "value" };
        const expected = { ...originalMetadata, ...newValue }

        record.updateMetadata(expected);

        expect(record.metadata).toEqual(expected);
    });

    test("should not update metadata when is v1", () => {
        const recordId = crypto.randomUUID();
        const record = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '/path/to/record.pdf',
            name: 'record',
            createAt: new Date(),
            version: "v1",
            status: RECORD_STATUS_STARTED
        });

        expect(record.metadata).toBeNull()

        const newValue = { "new": "value" };
        record.updateMetadata(newValue);

        expect(record.metadata).toBeNull()
    });

    test("should add a filepath when the record is not completed", () => {
        const filepath: string = '/path/to/record.pdf';
        const recordId = crypto.randomUUID();
        const record = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '',
            name: 'record',
            createAt: new Date(),
            version: "v1",
            status: RECORD_STATUS_STARTED
        });

        expect(record.filepath).toBe("");

        record.updateFilepath(filepath);

        expect(record.filepath).toBe(filepath)
    });

    test("should not add a filepath when the record is not completed", () => {
        const filepath: string = '/path/to/record.pdf';
        const recordId = crypto.randomUUID();
        const record = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '',
            name: 'record',
            createAt: new Date(),
            version: "v1",
            status: RECORD_STATUS_COMPLETED
        });

        expect(record.filepath).toBe("");

        record.updateFilepath(filepath);

        expect(record.filepath).toBe("")
    });

    test("should change status to completed when complete is invoked", () => {
        const recordId = crypto.randomUUID();
        const record = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '',
            name: 'record',
            createAt: new Date(),
            version: "v1",
            status: RECORD_STATUS_STARTED
        });

        expect(record.status).toBe(RECORD_STATUS_STARTED);

        record.complete();

        expect(record.status).toBe(RECORD_STATUS_COMPLETED)
    });

    test("should change status to started when uncomplete is invoked", () => {
        const recordId = crypto.randomUUID();
        const record = Record.rehydrate({
            id: recordId,
            clientId: "client-id",
            filepath: '',
            name: 'record',
            createAt: new Date(),
            version: "v1",
            status: RECORD_STATUS_STARTED
        });

        expect(record.status).toBe(RECORD_STATUS_STARTED);

        record.uncomplete();

        expect(record.status).toBe(RECORD_STATUS_STARTED)
    });
});