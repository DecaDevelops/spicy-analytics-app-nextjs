import { db } from "@/_db/db";
import Link from "next/link";

export default async function MyChatbots() {
  const data = await db.query.my_chatbots.findMany({
    with: {
      creator: true,
    },
  });

  const total = data.reduce((acc, x) => acc + x.num_messages, 0);
  return (
    <div>
      <h1 className="text-6xl my-4 text-center">
        Total interactions: {total.toLocaleString()}
      </h1>
      <div className="grid grid-cols-3 gap-2 text-center">
        {data.map((x, key) => (
          <Link href={`/bot/${x.bot_id}`} key={key}>
            <div key={key}>
              <h1>{x.bot_name}</h1>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
