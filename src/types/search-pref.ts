export const search = JSON.stringify({
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
      filter_by:
        "application_ids:spicychat && tags:![Step-Family,NSFW,Oral,Vore,Flatulence,Masochistic,Watersport,CNC,Impregnation,Lactation,Anal] && is_nsfw:false && creator_user_id:!['kp:17e3258a8b374b81bf064777566d16f2'] && type:STANDARD",
      max_facet_values: 100,
      page: 1,
      per_page: 48,
    },
  ],
});
