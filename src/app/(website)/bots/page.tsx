"use server";
import { NextRequest } from "next/server";
import {
  AVATAR_BASE_URL,
  BASE_URL,
  SPICY_CHATBOT_LINK,
  SPICY_CREATOR_LINK,
} from "../../../../default.env";
import { BotsSelect, CreatorSelect } from "@/_db/types";
import Image from "next/image";
import Link from "next/link";
import { bots_rank_history_disp, getMostRecentArchivedBots } from "./action";
export default async function Page(req: NextRequest) {
  const url = new URL("/api/bots/all", BASE_URL);
  const result = (await fetch(url.toString(), {
    method: "GET",
  }).then((res) => res.json())) as (BotsSelect & {
    creator: CreatorSelect;
  })[];

  const most_recent = await getMostRecentArchivedBots();

  const bots = JSON.parse(most_recent.bots) as bots_rank_history_disp[];
  return (
    <div className="grid grid-cols-3 w-[75vw] mx-auto gap-3 my-5">
      {bots.map((x, key) => (
        <div
          className="bg-gray-500 flex flex-col items-center gap-3 p-3"
          key={key}
        >
          <Link
            href={`${SPICY_CHATBOT_LINK}/${x.bot_id}`}
            target="_blank"
            className="flex flex-col justify-center items-center"
          >
            <div className="relative w-64 h-64 overflow-hidden">
              <Image
                src={AVATAR_BASE_URL + x.avatar_url}
                fill
                style={{ objectFit: "contain" }}
                className="blur-3xl"
                alt="img"
              />
            </div>
            <h1>{x.bot_name}</h1>
          </Link>
          <Link
            href={`${SPICY_CREATOR_LINK}/${x.creator_name}`}
            target="_blank"
          >
            {"@" + x.creator_name}
          </Link>
          <p className="text-center">{x.bot_title}</p>
        </div>
      ))}
    </div>
  );
}
