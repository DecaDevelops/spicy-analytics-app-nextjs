import { BotsInsert, CreatorInsert } from "@/_db/types";
import { document } from "@/types/typesense/chatbots";

export function mapDocumentToBot(doc: document): BotsInsert {
  return {
    bot_id: doc.character_id,
    avatar_url: doc.avatar_url,
    bot_name: doc.name,
    bot_title: doc.title,
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
