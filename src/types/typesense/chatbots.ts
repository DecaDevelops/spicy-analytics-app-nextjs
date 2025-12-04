type counts = {
  counts: number;
  highlighted: string;
  value: string;
};
type facet_counts = {
  found: number;
} & {
  field_name: string;
  counts: counts[];
  sampled: boolean;
  stats: {
    total_values: number;
  };
}[];

export type document = {
  avatar_is_nsfw: boolean;
  avatar_url: string;
  character_id: string;
  creator_user_id: string;
  creator_username: string;
  definition_visible: boolean;
  group_size_category: string;
  is_nsfw: boolean;
  lora_status: string;
  name: string;
  num_messages: number;
  rating_score: number;
  tags: string[];
  title: string;
  token_count: number;
  type: string;
};
type hits = {
  document: document;
  visibility: object;
};
type chatbot_response = {
  facet_counts: facet_counts;
  found: number;
  hits: hits[];
  out_of: number;
  page: number;
  request_params: {
    collection_name: string;
    first_q: string;
    per_page: 48;
    q: string;
  };
  search_cutoff: boolean;
  search_time_ms: number;
};

export type results = { results: chatbot_response[] };
