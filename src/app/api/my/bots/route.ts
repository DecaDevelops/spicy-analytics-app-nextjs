"use server";
import { NextResponse } from "next/server";
import fs from "fs";
import { BearerTokens } from "@/types/auth";
import { BASE_API_URL } from "../../../../../default.env";
import { my_chatbots, my_chatbots_history } from "@/_db/schema";
import { my_chatbots as mc } from "@/types/typesense/chatbots";
import { mapMyChatBots } from "@service/mappers/chatbot.mapper";
import { db } from "@/_db/db";

export async function GET() {
  if (!fs.existsSync("./auth.json")) {
    return NextResponse.json(
      { error: "Unauthorized, please log in!!" },
      { status: 401 }
    );
  }

  try {
    const data = fs.readFileSync("./bearer.json", "utf-8");

    const authData = JSON.parse(data) as BearerTokens;
    const headers = new Headers();

    if (authData) {
      headers.set("authorization", `Bearer ${authData.bearer}`);
      const result = await fetch(BASE_API_URL, {
        method: "GET",

        headers: headers,
        next: { revalidate: 3600 },
      });
      if (!result.ok) return NextResponse.json({}, { status: 401 });
      const results = await result.json();
      const data = results.data as mc[];
      const { insert_my_chatbots, insert_my_chatbots_history } = data.reduce<{
        insert_my_chatbots: (typeof my_chatbots.$inferInsert)[];
        insert_my_chatbots_history: (typeof my_chatbots_history.$inferInsert)[];
      }>(
        (acc, p) => {
          acc.insert_my_chatbots.push(mapMyChatBots(p));
          acc.insert_my_chatbots_history.push({
            num_messages: p.num_messages ? p.num_messages : 0,
            bot_id: p.id,
            rating_score: p.rating_score ? p.rating_score.toString() : null,
          });
          return acc;
        },
        { insert_my_chatbots: [], insert_my_chatbots_history: [] }
        // mapMyChatBots(p)
      );

      await db
        .insert(my_chatbots)
        .values(insert_my_chatbots)
        .onConflictDoNothing();
      await db
        .insert(my_chatbots_history)
        .values(insert_my_chatbots_history)
        .onConflictDoNothing();

      return Response.json({}, { status: 201 });
    }
  } catch (error) {
    return NextResponse.json({}, { status: 401 });
  }
}
