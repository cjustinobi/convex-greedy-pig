import { GenericDatabaseReader } from 'convex/server'
import { DataModel, Doc, Id } from './_generated/dataModel'

export async function findGame(
  db: GenericDatabaseReader<DataModel>,
  id: Id<'games'>

): Promise<Doc<'games'> | null> {
 
  const res = await db
    .query('games')
    .filter((q) => q.eq(q.field('_id'), id))
    .unique()

    if (!res)  {
      return null
    }
    return res

}

export async function getUserByIdentifier(
  db: GenericDatabaseReader<DataModel>,
  tokenIdentifier: string

): Promise<Doc<'users'> | null> {
 
  return await db
      .query('users')
      .withIndex('by_token', (q) =>
        q.eq('tokenIdentifier', tokenIdentifier),
      )
      .unique()

}