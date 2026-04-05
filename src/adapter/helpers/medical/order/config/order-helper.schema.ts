import { z } from "zod";

const schema = z.object({
    LOGO_PATH: z.coerce.string().nonempty(),
    CHECKLIST_TEMPLATE_PATH: z.coerce.string().nonempty(),
    REDIRECT_URL_EMAIL: z.coerce.string().url(),
});

export default schema;