import { WebLogo } from "@/omega-web/web-logo/entities/web-logo.entity";

const stubWebLogo = (id: number): WebLogo => ({
    id: id,
    name: "web-resource",
    clients: [],
    createAt: new Date(),
    updateAt: new Date(),
});

export const mockWebLogo = () => stubWebLogo(1);
export const mockWebLogos = () => [1, 2, 3, 4, 5].map(stubWebLogo);