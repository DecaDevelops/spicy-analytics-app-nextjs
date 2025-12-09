import { relations, sql } from "drizzle-orm";
import { timestamp } from "drizzle-orm/gel-core";
import {
  integer,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
function getRoundedHour() {
  const now = new Date();
  const minutes = now.getMinutes();
  const roundedMinutes = Math.floor(minutes / 15) * 15;
  now.setMinutes(roundedMinutes, 0, 0);
  return now.toLocaleString().replace("T", " ").slice(0, 19);
}

const timestamps = {
  createdAt: text("created_at")
    .notNull()
    .$defaultFn(() => getRoundedHour()),
  updatedAt: text("updated_at")
    .$defaultFn(() => getRoundedHour())
    .$onUpdateFn(() => getRoundedHour()),
};

export const creators = sqliteTable("creators", {
  creator_id: text().primaryKey().unique(),
  name: text().notNull(),
  bot_count: integer().default(0),
  ...timestamps,
});

export const bots = sqliteTable("bots", {
  bot_id: text().primaryKey(),
  bot_name: text().notNull(),
  bot_title: text().notNull(),
  rating_score: text(),
  num_messages: integer().notNull(),
  tags: text(),
  token_count: integer(),
  creator_user_id: text().references(() => creators.creator_id),
  avatar_url: text(),
  ...timestamps,
});
export const my_chatbots = sqliteTable("my_chatbots", {
  bot_id: text().primaryKey(),
  bot_name: text().notNull(),
  bot_title: text().notNull(),
  rating_score: text(),
  num_messages: integer().notNull(),
  tags: text(),
  token_count: integer(),
  creator_user_id: text().references(() => creators.creator_id),
  avatar_url: text(),
  ...timestamp,
});
export const bots_rank_history = sqliteTable(
  "bot_rank_history",
  {
    id: integer().primaryKey({ autoIncrement: true }),
    bot_id: text().references(() => bots.bot_id, { onDelete: "cascade" }),
    rank: integer(),
    rating_score: text(),
    message_count: integer(),
    ...timestamps,
  },
  (table) => ({
    uniqCreatedRank: uniqueIndex("uniq_created_rank").on(
      table.createdAt,
      table.rank
    ),
  })
);

// export const top240_history = sqliteTable("top240_history", {
//   id: integer().primaryKey({ autoIncrement: true }),
//   bot_id: integer().references(() => bots.bot_id),
//   count: integer(),
//   ...timestamp,
// });

// export const top480_history = sqliteTable("top480_history", {
//   id: integer().primaryKey({ autoIncrement: true }),
//   bot_id: text().references(() => bots.bot_id),
//   count: integer(),
//   ...timestamps,
// });

export const available_tags = sqliteTable("available_bot_tags", {
  id: integer().primaryKey({ autoIncrement: true }),
  tag: text().unique().notNull(),
  ...timestamps,
});

export const creatorRelations = relations(creators, ({ many }) => ({
  bots: many(bots),
  my_chatbots: many(my_chatbots),
}));

export const botRelations = relations(bots, ({ one, many }) => ({
  creator: one(creators, {
    fields: [bots.creator_user_id],
    references: [creators.creator_id],
  }),

  bots_rank_history: many(bots_rank_history),
}));

export const botRankRelations = relations(
  bots_rank_history,
  ({ one, many }) => ({
    bots: one(bots, {
      fields: [bots_rank_history.bot_id],
      references: [bots.bot_id],
    }),
  })
);

export const myChatBotRelations = relations(my_chatbots, ({ one }) => ({
  creator: one(creators, {
    fields: [my_chatbots.creator_user_id],
    references: [creators.creator_id],
  }),
}));
