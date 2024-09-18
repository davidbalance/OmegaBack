import { SessionEntity } from "../entities/session.entity";

const stubSession = (id: number): SessionEntity => ({
    id: id,
    token: "Stub token",
    refresh: "Stub token",
    session: "Stub session",
    createAt: new Date(),
    updateAt: new Date()
});

export const mockSession = () => stubSession(1);
export const mockSessions = () => Array(10).map(stubSession);