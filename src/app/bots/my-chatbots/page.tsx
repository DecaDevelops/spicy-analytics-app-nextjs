import { db } from "@/_db/db";

export default async function MyChatbots() {
  const data = await db.query.my_chatbots.findMany({
    with: {
      creator: true,
    },
  });
  return (
    <div>
      {data.map((x, key) => (
        <div key={key}>
          <h1>{x.bot_name}</h1>
        </div>
      ))}
    </div>
  );
}
