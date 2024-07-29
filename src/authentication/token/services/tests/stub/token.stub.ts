import { Token } from "nodemailer/lib/xoauth2";

const stubToken = (): Token => ({
    user: "stub-user-token",
    accessToken: "stub-access-token",
    expires: 1
});

export const mockToken = () => stubToken();