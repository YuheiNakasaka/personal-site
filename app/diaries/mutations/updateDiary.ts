import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const UpdateDiary = z.object({
  id: z.number(),
  text: z.string(),
})

export default resolver.pipe(
  resolver.zod(UpdateDiary),
  resolver.authorize(),
  async ({ id, ...data }) => {
    const diary = await db.diary.update({ where: { id }, data })
    return diary
  }
)
