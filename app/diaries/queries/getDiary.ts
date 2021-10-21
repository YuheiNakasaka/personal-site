import { resolver, NotFoundError } from "blitz"
import db from "db"
import { z } from "zod"

const GetDiary = z.object({
  id: z.number().optional().refine(Boolean, "Required"),
})

export default resolver.pipe(resolver.zod(GetDiary), async ({ id }) => {
  const diary = await db.diary.findFirst({ where: { id } })
  if (!diary) throw new NotFoundError()
  return diary
})
