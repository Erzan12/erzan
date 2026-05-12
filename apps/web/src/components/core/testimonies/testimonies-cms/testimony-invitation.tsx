"use client";

import {
  Inbox,
  CheckCircle,
  Clock3,
  XCircle,
} from "lucide-react";
import { InvitationCard } from "./testimony-invitation-card";

interface InvitationsListProps {
  items: any[];

  status:
    | "PENDING"
    | "ACCEPTED"
    | "EXPIRED"
    | "DECLINED";
}

export default function InvitationsList({
  items,
  status,
}: InvitationsListProps) {
  if (items.length === 0) {
    return <EmptyState status={status} />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {items.map((item) => (
        <InvitationCard
          key={item.id}
          item={item}
          status={status}
        />
      ))}
    </div>
  );
}

function EmptyState({
  status,
}: {
  status:
    | "PENDING"
    | "ACCEPTED"
    | "EXPIRED"
    | "DECLINED";
}) {
  const states = {
    PENDING: {
      icon: Clock3,
      title: "No pending invitations",
      description:
        "New invitations will appear here.",
      color: "text-yellow-500",
    },

    ACCEPTED: {
      icon: CheckCircle,
      title: "No accepted invitations yet",
      description:
        "Accepted invitations will appear here.",
      color: "text-green-500",
    },

    EXPIRED: {
      icon: Inbox,
      title: "No expired invitations",
      description:
        "Expired invitations will appear here.",
      color: "text-slate-400",
    },

    DECLINED: {
      icon: XCircle,
      title: "No declined invitations",
      description:
        "Declined invitations will appear here.",
      color: "text-red-500",
    },
  };

  const state = states[status];

  const Icon = state.icon;

  return (
    <div className="flex flex-col items-center justify-center py-20 px-6 border-2 border-dashed border-slate-500/10 rounded-[3rem] bg-slate-500/5">
      <div className="p-4 bg-white dark:bg-slate-900 rounded-2xl shadow-xl mb-4">
        <Icon
          className={`w-8 h-8 ${state.color}`}
        />
      </div>

      <h3 className="text-lg font-bold text-slate-900 dark:text-white">
        {state.title}
      </h3>

      <p className="text-slate-500 text-sm mt-1 text-center">
        {state.description}
      </p>
    </div>
  );
}