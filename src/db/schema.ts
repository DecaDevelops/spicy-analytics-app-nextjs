import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const creators = sqliteTable("creators", {
  id: integer().primaryKey({ autoIncrement: true }),
  name: text(),
  url: text(),
  bot_count: integer(),
});

export const bots = sqliteTable("bots", {
  date: text(),
  bot_id: text().primaryKey(),
  bot_name: text(),
  bot_title: text(),
  num_messages: integer(),
  creator_user_id: integer().references(() => creators.id),
  avatar_url: text(),
  created_at: text(),
});

export const bots_rank_history = sqliteTable("bot_rank_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text(),
  bot_id: text().references(() => bots.bot_id, { onDelete: "cascade" }),
  rank: integer(),
  page: integer(),
  creator_user_id: text(),
});

export const top240_history = sqliteTable("top240_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text(),
  count: integer(),
});

export const top480_history = sqliteTable("top480_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  date: text(),
  count: integer(),
});
