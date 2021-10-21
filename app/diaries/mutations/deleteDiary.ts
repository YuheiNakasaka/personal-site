import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

const DeleteDiary = z.object({
  id: z.number(),
})

export default resolver.pipe(resolver.zod(DeleteDiary), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const diary = await db.diary.deleteMany({ where: { id } })

  return diary
})
