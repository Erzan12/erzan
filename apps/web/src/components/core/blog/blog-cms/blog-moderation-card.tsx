"use client";

import { useState, useTransition } from "react";
import { format } from "date-fns";
import { Check, X, Eye } from "lucide-react";
import { moderatePost } from "@/lib/actions/blog-cms";

export function BlogModerationCard({
  item,
  type,
  adminId,
}: {
  item: any;
  type: "draft" | "published" | "rejected";
  adminId: string;
}) {
  const [isPending, startTransition] = useTransition();
  const [showModal, setShowModal] = useState(false);
  const [actionType, setActionType] = useState<"approve" | "reject" | null>(null);

  const triggerAction = (type: "approve" | "reject") => {
    setActionType(type);
    setShowModal(true);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      await moderatePost(item.id, {
        approve: actionType === "approve",
        adminId,
      });

      setShowModal(false);
      setActionType(null);
    });
  };

  return (
    <div className="bg-white dark:bg-slate-900/50 border border-slate-500/10 rounded-[2rem] p-6 flex flex-col gap-4 hover:border-slate-500/30 transition-all">

      {/* Header */}
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
            {item.title}
          </h3>

          {item.excerpt && (
            <p className="text-sm text-slate-500 mt-1 line-clamp-2">
              {item.excerpt}
            </p>
          )}

          <div className="flex items-center gap-3 mt-3 text-xs text-slate-400">
            <span>{item.author?.name || "Unknown author"}</span>
            <span>•</span>
            <span>{format(new Date(item.createdAt), "MMM dd, yyyy")}</span>
            <span>•</span>
            <span>{item.views} views</span>
          </div>
        </div>

        {/* Cover */}
        {item.coverImage && (
          <img
            src={item.coverImage}
            alt={item.title}
            className="w-24 h-20 object-cover rounded-xl border border-slate-500/10"
          />
        )}
      </div>

      {/* Status badge */}
      <div className="flex gap-2 text-xs">
        <span className="px-3 py-1 rounded-full bg-slate-500/10 text-slate-600 dark:text-slate-300">
          {item.status}
        </span>

        {item.published && (
          <span className="px-3 py-1 rounded-full bg-green-500/10 text-green-600">
            Published
          </span>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={() => triggerAction("approve")}
          disabled={isPending}
          className="p-3 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition disabled:opacity-40"
          title="Approve"
        >
          <Check size={18} />
        </button>

        <button
          onClick={() => triggerAction("reject")}
          disabled={isPending}
          className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition disabled:opacity-40"
          title="Reject"
        >
          <X size={18} />
        </button>

        <button
          className="p-3 bg-slate-500/10 text-slate-600 rounded-xl hover:bg-slate-500 hover:text-white transition"
          title="Preview"
        >
          <Eye size={18} />
        </button>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl w-full max-w-md">

            <h3 className="text-lg font-bold mb-2">
              {actionType === "approve" ? "Publish Post?" : "Reject Post?"}
            </h3>

            <p className="text-sm text-slate-500 mb-4">
              {actionType === "approve"
                ? "This will make the post visible to the public."
                : "This will move the post to rejected state."}
            </p>

            <div className="flex gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="flex-1 py-2 text-slate-500"
              >
                Cancel
              </button>

              <button
                onClick={handleConfirm}
                disabled={isPending}
                className="flex-1 py-2 bg-black text-white rounded-xl"
              >
                Confirm
              </button>
            </div>

          </div>
        </div>
      )}
    </div>
  );
}