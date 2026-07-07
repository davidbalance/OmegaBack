import { z } from "zod";

const schema = z.object({
    CHROMIUM_PATH: z.coerce.string().default('/usr/bin/chromium')
});

export default schema;