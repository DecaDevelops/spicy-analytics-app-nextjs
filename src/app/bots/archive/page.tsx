"use server";
import { bots_rank_history_disp, getArchivedBots } from "../action";
import ArchiveCard from "../_components/archive_card";

export default async function Page() {
  const result = await getArchivedBots();

  return (
    <div className="bg-slate-800 grid grid-cols-3 gap-5 my-5 p-6">
      {result.map((x, key) => {
        const _bots = JSON.parse(x.bots) as bots_rank_history_disp[];
        return (
          <div
            key={key}
            className="flex flex-col justify-center items-center bg-slate-600"
          >
            <h1 className="text-4xl my-1">
              Result of: <span className="font-bold">{x.created_at}</span>
            </h1>
            <ArchiveCard bots={_bots} key={key} />
          </div>
        );
      })}
    </div>
  );
}
