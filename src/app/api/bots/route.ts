"use server";

import { default_search as search } from "@/types/search-pref";
import { TYPESENSE_ENDPOINT, TYPESENSE_KEY } from "../../../../default.env";
import { results } from "@/types/typesense/chatbots";
import {
  mapDocumentToAuthor,
  mapDocumentToBot,
  mapDocumentToBotRankHistory,
} from "../../../../service/mappers/chatbot.mapper";
import { BotsInsert, botsRankHistoryInsert, CreatorInsert } from "@/_db/types";
import { db } from "@/_db/db";
import { creators, bots as _bots, bots_rank_history, bots } from "@/_db/schema";
import { sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";

export async function GET() {
  const MAX_PAGES = 10;

  for (let i = 1; i <= MAX_PAGES; i++) {
    const res = await fetch(TYPESENSE_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json, text-plain, */*",
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/140.0.0.0 Safari/537.36",
        "Accept-Language": "en-Us,en;q0.9",
        Origin: "https://spicychat.ai",
        Referer: "https://spicychat.ai",
        "x-app-id": "spicychat",
        "x-country": "US",
        "Content-Type": "application/json",
        "X-TYPESENSE-API-KEY": TYPESENSE_KEY,
      },
      body: search(i),
    });
    if (!res.ok)
      return Response.json(
        { error: "could not fetch data, please authorize" },
        { status: 401 }
      );

    const result = (await res.json()) as results;

    const workable_array = result.results[0];

    const { hits, facet_counts } = workable_array;

    const { authors, bots, botRankHistory } = hits.reduce<{
      authors: CreatorInsert[];
      bots: BotsInsert[];
      botRankHistory: botsRankHistoryInsert[];
    }>(
      (acc, x, key) => {
        acc.authors.push(mapDocumentToAuthor(x.document));
        acc.bots.push(mapDocumentToBot(x.document));
        acc.botRankHistory.push(
          mapDocumentToBotRankHistory(x.document, key, i)
        );
        return acc;
      },
      { authors: [], bots: [], botRankHistory: [] }
    );

    await db.insert(creators).values(authors).onConflictDoNothing();
    await db
      .insert(_bots)
      .values(bots)
      .onConflictDoUpdate({
        target: _bots.bot_id,
        set: {
          bot_name: sql`excluded.bot_name`,
          bot_title: sql`excluded.bot_title`,
          num_messages: sql`excluded.num_messages`,
          avatar_url: sql`excluded.avatar_url`,
          tags: sql`excluded.tags`,
          token_count: sql`excluded.token_count`,
        },
      });
    await db
      .insert(bots_rank_history)
      .values(botRankHistory)
      .onConflictDoNothing();
  }
  await db.update(creators).set({
    bot_count: sql<number>`(select count(*) from ${bots} where ${bots.creator_user_id} = ${creators.creator_id})`,
  });
  revalidatePath("/bots");
  return Response.json({ updated: "okay" }, { status: 201 });
}
