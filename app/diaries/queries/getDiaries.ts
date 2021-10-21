import { paginate, resolver } from "blitz"
import db, { Prisma } from "db"

interface GetDiariesInput
  extends Pick<Prisma.DiaryFindManyArgs, "where" | "orderBy" | "skip" | "take"> {}

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }: GetDiariesInput) => {
  const {
    items: diaries,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () => db.diary.count({ where }),
    query: (paginateArgs) => db.diary.findMany({ ...paginateArgs, where, orderBy }),
  })

  return {
    diaries,
    nextPage,
    hasMore,
    count,
  }
})
