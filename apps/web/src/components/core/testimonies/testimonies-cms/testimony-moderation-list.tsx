"use client";

import { ModerationCard } from "./testimony-moderation-card"; // This is the card design we discussed
import { Inbox, CheckCircle } from "lucide-react";

interface ModerationListProps {
  items: any[];
  type: "pending" | "published";
}

export default function ModerationList({ items, type }: ModerationListProps) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-500/10 rounded-[3rem] bg-slate-500/5">
        {type === "pending" ? (
          <>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl mb-4">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">All caught up!</h3>
            <p className="text-slate-500 text-sm mt-1 text-center">There are no testimonials waiting for review.</p>
          </>
        ) : (
          <>
             <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl mb-4">
              <Inbox className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">Nothing published yet</h3>
            <p className="text-slate-500 text-sm mt-1 text-center">Approved testimonials will appear here.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {items.map((item) => (
        <ModerationCard key={item.id} item={item} type={type} />
      ))}
    </div>
  );
}