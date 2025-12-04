import {
  bots,
  bots_rank_history,
  creators,
  top240_history,
  top480_history,
} from "./schema";

export type CreatorInsert = typeof creators.$inferInsert;
export type CreatorSelect = typeof creators.$inferSelect;

export type BotsInsert = typeof bots.$inferInsert;
export type BotsSelect = typeof bots.$inferSelect;

export type top240Insert = typeof top240_history.$inferInsert;
export type top240Select = typeof top240_history.$inferSelect;

export type botsRankHistoryInsert = typeof bots_rank_history.$inferInsert;
export type botsRankHistorySelect = typeof bots_rank_history.$inferSelect;

export type top480Insert = typeof top480_history.$inferInsert;
export type top480Select = typeof top480_history.$inferSelect;
