import { mutation, query } from './_generated/server'
import { getUserByIdentifier } from './utils'

export const createdGames = query({
  args: {},
  handler: async ({ auth, db }) => {
    const identity = await auth.getUserIdentity()
    if (identity === null) {
      return console.log('Not authenticated')
    }
    console.log('Authenticated as', identity, identity.email)
    const user = await getUserByIdentifier(db, identity.tokenIdentifier)

    return await db
      .query('games')
      .filter((q) => q.eq(q.field('creator'), user?._id))
      .collect()
  },
})

export const store = mutation({
  args: {},
  handler: async ({ db, auth }) => {
    const identity = await auth.getUserIdentity()
    if (!identity) {
      throw new Error('Called storeUser without authentication present')
    }

   
    const user = await getUserByIdentifier(db, identity.tokenIdentifier)
    if (user !== null) {
      // If we've seen this identity before but the name has changed, patch the value.
      if (user.name !== identity.name) {
        await db.patch(user._id, { 
          name: identity.name ,
          email: identity.email 
        })
      }
      return user._id
    }
    // If it's a new identity, create a new `User`.
    return await db.insert('users', {
      name: identity.name!,
      email: identity.email!,
      tokenIdentifier: identity.tokenIdentifier
    })
  }
})