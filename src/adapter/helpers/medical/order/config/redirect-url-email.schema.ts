import { z } from "zod";

const schema = z.object({
    REDIRECT_URL_EMAIL: z.coerce.string().url(),
});

export default schema;