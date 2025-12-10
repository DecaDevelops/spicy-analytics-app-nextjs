import { BotsRankHistoryResult } from "@/types/api-response-types";
import React from "react";

type props = {
  bot: BotsRankHistoryResult;
};
function BotHistoryCard({ bot }: props) {
  //   if (!bot) return <div></div>;
  return (
    <div>
      <h1>{bot?.bots?.bot_name}</h1>
      <div>{}</div>
    </div>
  );
}

export default React.memo(BotHistoryCard);
