import { my_chatbots } from "@/_db/schema";
import { BotsInsert, botsRankHistoryInsert, CreatorInsert } from "@/_db/types";
import { document, my_chatbots as mc } from "@/types/typesense/chatbots";

export function mapDocumentToBot(doc: document): BotsInsert {
  return {
    bot_id: doc.character_id,
    avatar_url: doc.avatar_url,
    bot_name: doc.name,
    bot_title: doc.title,
    rating_score: doc.rating_score ? String(doc.rating_score) : null,
    creator_user_id: doc.creator_user_id,
    num_messages: doc.num_messages,
    tags: JSON.stringify(doc.tags),
    token_count: doc.token_count,
  };
}

export function mapDocumentToAuthor(doc: document): CreatorInsert {
  return {
    creator_id: doc.creator_user_id,
    name: doc.creator_username,
  };
}

export function mapDocumentToBotRankHistory(
  doc: document,
  index: number,
  currentPage: number
): botsRankHistoryInsert {
  return {
    bot_id: doc.character_id,
    rank: index + 1 + (currentPage - 1) * 48,
    message_count: doc.num_messages,
    rating_score: doc.rating_score ? String(doc.rating_score) : null,
  };
}

export function mapMyChatBots(data: mc): typeof my_chatbots.$inferInsert {
  return {
    bot_id: data.id,
    avatar_url: data.avatar_url,
    bot_name: data.name,
    num_messages: data.num_messages,
    creator_user_id: data.creator_user_id,
    rating_score: data.rating_score ? String(data.rating_score) : null,
    tags: JSON.stringify(data.tags),
    token_count: data.token_count,
    bot_title: data.title,
  };
}
