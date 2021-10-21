import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetDiary = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetDiary), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const diary = await db.diary.findFirst({ where: { id } })

  if (!diary) throw new NotFoundError()

  return diary
})
