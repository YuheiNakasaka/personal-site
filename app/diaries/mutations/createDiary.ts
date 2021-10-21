import { resolver } from "blitz"
import db from "db"
import { z } from "zod"

export const CreateDiary = z.object({
  text: z.string(),
})

export default resolver.pipe(
  resolver.zod(CreateDiary),
  resolver.authorize(),
  async (input, { session: { userId } }) => {
    const diary = await db.diary.create({
      data: { ...input, userId: userId },
    })
    return diary
  }
)
