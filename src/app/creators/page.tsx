"use server";

import { db } from "@/db/db";
import { creators } from "@/db/schema";

export default async function Page() {
  const _creators = await db.select().from(creators);

  return (
    <div>
      <div>
        <ul>
          {_creators.map((x) => (
            <li key={x.id}>{x.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
