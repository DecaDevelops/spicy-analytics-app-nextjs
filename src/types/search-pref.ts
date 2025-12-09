export const default_search = (current_page: number) =>
  JSON.stringify({
    searches: [
      {
        query_by: "name,title,tags,creator_username,character_id,type",
        include_fields:
          "name,title,tags,creator_username,character_id,avatar_is_nsfw,avatar_url,visibility,definition_visible,num_messages,token_count,rating_score,lora_status,creator_user_id,is_nsfw,type,sub_characters_count,group_size_category",
        use_cache: true,
        highlight_fields: "none",
        enable_highlight_v1: false,
        sort_by: "num_messages_24h:desc",
        highlight_full_fields:
          "name,title,tags,creator_username,character_id,type",
        collection: "public_characters_alias",
        q: "*",
        facet_by: "tags",
        filter_by: "application_ids:spicychat && is_nsfw:true ",
        max_facet_values: 100,
        page: current_page,
        per_page: 48,
      },
    ],
  });
