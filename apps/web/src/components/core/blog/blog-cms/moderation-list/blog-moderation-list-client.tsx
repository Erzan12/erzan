"use client";

import { BlogModerationCard } from "../blog-moderation-card";

export function ModerationListClient({ items, type, adminId }: any) {
  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-500/10 rounded-[3rem] bg-slate-500/5">
        <p className="text-slate-500 text-sm">No items</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4">
      {items.map((item: any) => (
        <BlogModerationCard
          key={item.id}
          item={item}
          type={type}
          adminId={adminId}
        />
      ))}
    </div>
  );
}