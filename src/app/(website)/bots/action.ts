"use server";

import { db } from "@/_db/db";
import { bots, bots_rank_history, creators } from "@/_db/schema";
import { sql, eq, inArray, asc, desc } from "drizzle-orm";

export type bots_rank_history_disp = {
  bot_id: string;
  bot_title: string;
  bot_name: string;
  avatar_url: string;
  creator_name: string;
  archived_rank: string;
  rating_score: string;
  message_count: string;
};

const select_archived = {
  created_at: bots_rank_history.createdAt,
  bots: sql<string>`json_group_array(
            json_object(
                'bot_id', ${bots.bot_id},
                'bot_title', ${bots.bot_title},
                'bot_name', ${bots.bot_name},
                'avatar_url', ${bots.avatar_url},
                'creator_name', ${creators.name},
                'message_count', ${bots_rank_history.message_count},
                'archived_rank', ${bots_rank_history.rank},
                'rating_score', ${bots_rank_history.rating_score}))`,
};

export async function getArchivedBots() {
  const result = await db
    .selectDistinct(select_archived)
    .from(bots_rank_history)
    .leftJoin(bots, eq(bots.bot_id, bots_rank_history.bot_id))
    .leftJoin(creators, eq(creators.creator_id, bots.creator_user_id))
    .where(inArray(bots_rank_history.rank, [1, 2, 3, 4, 5]))
    .groupBy(bots_rank_history.createdAt)
    .orderBy(bots_rank_history.rank, desc(bots_rank_history.createdAt));

  return result;
}

export async function getMostRecentArchivedBots() {
  const [result] = await db
    .selectDistinct(select_archived)
    .from(bots_rank_history)
    .leftJoin(bots, eq(bots.bot_id, bots_rank_history.bot_id))
    .leftJoin(creators, eq(creators.creator_id, bots.creator_user_id))
    .groupBy(bots_rank_history.createdAt)
    .orderBy(asc(bots_rank_history.rank))
    .limit(1);

  return result;
}
