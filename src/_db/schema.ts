import { relations, sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

const timestamps = {
  createdAt: text("created_at")
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text("updated_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .$onUpdateFn(() => sql`CURRENT_TIMESTAMP`),
};

export const creators = sqliteTable("creators", {
  id: integer().primaryKey({ autoIncrement: true }),
  creator_id: text().notNull().unique(),
  name: text(),
  bot_count: integer().default(0),
  ...timestamps,
});

export const bots = sqliteTable("bots", {
  bot_id: text().primaryKey(),
  bot_name: text(),
  bot_title: text(),
  num_messages: integer(),
  tags: text(),
  token_count: integer(),
  creator_user_id: text().references(() => creators.creator_id),
  avatar_url: text(),
  ...timestamps,
});

export const bots_rank_history = sqliteTable("bot_rank_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  bot_id: text().references(() => bots.bot_id, { onDelete: "cascade" }),
  rank: integer(),
  page: integer(),
  creator_user_id: text(),
  ...timestamps,
});

export const top240_history = sqliteTable("top240_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  bot_id: integer().references(() => bots.bot_id),
  count: integer(),
  ...timestamp,
});

export const top480_history = sqliteTable("top480_history", {
  id: integer().primaryKey({ autoIncrement: true }),
  bot_id: text().references(() => bots.bot_id),
  count: integer(),
  ...timestamps,
});

export const available_tags = sqliteTable("available_bot_tags", {
  id: integer().primaryKey({ autoIncrement: true }),
  tag: text().unique(),
  ...timestamps,
});

export const creatorRelations = relations(creators, ({ many }) => ({
  bots: many(bots),
}));

export const botRelations = relations(bots, ({ one, many }) => ({
  creator: one(creators, {
    fields: [bots.creator_user_id],
    references: [creators.creator_id],
  }),
  top240_history: many(top240_history),
  top_480_history: many(top480_history),
  bots_rank_history: many(bots_rank_history),
}));
