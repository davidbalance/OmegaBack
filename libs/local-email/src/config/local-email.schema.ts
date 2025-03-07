import { z } from "zod";

const schema = z.object({
    LOCAL_EMAIL_USER: z.coerce.string().email(),
    LOCAL_EMAIL_PASS: z.coerce.string().nonempty(),
    LOCAL_EMAIL_DEFAULT_NAME: z.coerce.string().nonempty(),
    LOCAL_DEFAULT_ADDRESS: z.coerce.string().nonempty(),
    LOCAL_EMAIL_HOST: z.coerce.string().nonempty(),
    LOCAL_EMAIL_PORT: z.coerce.number().min(1),
    LOCAL_EMAIL_SECURE: z.coerce.boolean().default(false),
});

export default schema;