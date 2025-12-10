"use server";

import { db } from "@/_db/db";
import { my_chatbots } from "@/_db/schema";
import { eq } from "drizzle-orm";

type props = { params: Promise<{ id: string }> };

export default async function Page({ params }: props) {
  const { id } = await params;

  const [chatbot] = await db.query.my_chatbots.findMany({
    with: {
      my_chatbots_history: true,
    },
    where: eq(my_chatbots.bot_id, id),
  });
  return (
    <div>
      <h1>
        {chatbot.bot_name}{" "}
        <span>
          rating: (
          {chatbot.rating_score
            ? (Number(chatbot.rating_score) * 100).toLocaleString() + "%"
            : "unrated"}
          )
        </span>
      </h1>
      <h2>History:</h2>
      {chatbot.my_chatbots_history.map((x, key) => (
        <div key={x.createdAt}>
          {x.num_messages} ({x.createdAt} {"->"}{" "}
          {x.num_messages.toLocaleString()} )
        </div>
      ))}
    </div>
  );
}
