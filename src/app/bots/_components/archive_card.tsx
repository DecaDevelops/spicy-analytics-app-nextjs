"use client";

import { bots_rank_history_disp } from "../action";

type props = {
  bots: bots_rank_history_disp[];
};

function Card({ bot }: { bot: bots_rank_history_disp }) {
  return (
    <div className="relative">
      <h1>
        <span className="text-sm font-bold">#{bot.archived_rank}</span>{" "}
        <span className="text-xl">{bot.bot_name}</span>
        <span className="mx-2">
          {"("}
          <span>{bot.message_count}</span>
          {")"}
        </span>
      </h1>
      <h2>@{bot.creator_name}</h2>
    </div>
  );
}
export default function ArchiveCard({ bots }: props) {
  return (
    <div className=" w-full">
      {bots.map((x, key) => (
        <Card key={key} bot={x} />
      ))}
    </div>
  );
}
