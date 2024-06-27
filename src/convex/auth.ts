import { query } from "./_generated/server";

export const createdGames = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (identity === null) {
      throw new Error("Not authenticated");
    }
    return await ctx.db
      .query("games")
      .filter((q) => q.eq(q.field("creator"), identity.email))
      .collect();
  },
});