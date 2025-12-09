import { db } from "@/_db/db";

export const bots_rank_history_result =
  await db.query.bots_rank_history.findFirst({
    with: {
      bots: {
        with: {
          creator: true,
        },
      },
    },
  });

export type BotsRankHistoryResult = typeof bots_rank_history_result;
