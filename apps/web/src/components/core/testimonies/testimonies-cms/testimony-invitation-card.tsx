"use client";

import { InvitationStatus } from "@prisma/client";

import {
  Calendar,
  Clock3,
  CheckCircle2,
  XCircle,
  Copy,
  Mail,
} from "lucide-react";

import { formatDistanceToNow } from "date-fns";

import { Button } from "@/components/ui/button";

interface InvitationCardProps {
  item: {
    id: string;
    email: string;
    status: InvitationStatus;
    token: string;
    created_at: Date;
    expires_at: Date;
    accepted_at: Date | null;
  };

  status: InvitationStatus;
}

export function InvitationCard({
  item,
}: InvitationCardProps) {
  const inviteLink = `${process.env.NEXT_PUBLIC_APP_URL}/my-testimonial/invitations/${item.token}`;

  async function copyLink() {
    await navigator.clipboard.writeText(inviteLink);
  }

  const statusConfig = {
    PENDING: {
      icon: Clock3,
      color:
        "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
      label: "Pending",
    },

    ACCEPTED: {
      icon: CheckCircle2,
      color:
        "bg-green-500/10 text-green-600 border-green-500/20",
      label: "Accepted",
    },

    EXPIRED: {
      icon: XCircle,
      color:
        "bg-slate-500/10 text-slate-500 border-slate-500/20",
      label: "Expired",
    },

    DECLINED: {
      icon: XCircle,
      color:
        "bg-red-500/10 text-red-500 border-red-500/20",
      label: "Declined",
    },
  };

  const config = statusConfig[item.status];

  const StatusIcon = config.icon;

  return (
    <div className="group rounded-[2rem] border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-6 shadow-sm hover:shadow-xl transition-all duration-300">
      <div className="flex items-start justify-between gap-4">
        {/* LEFT */}
        <div className="space-y-4">
          <div>
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-slate-500/10">
                <Mail className="w-5 h-5 text-slate-600 dark:text-slate-300" />
              </div>

              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {item.email}
                </h3>

                <p className="text-sm text-slate-500">
                  Sent{" "}
                  {formatDistanceToNow(
                    new Date(item.created_at),
                    {
                      addSuffix: true,
                    }
                  )}
                </p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />

              <span>
                Expires{" "}
                {formatDistanceToNow(
                  new Date(item.expires_at),
                  {
                    addSuffix: true,
                  }
                )}
              </span>
            </div>

            {item.accepted_at && (
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />

                <span>
                  Accepted{" "}
                  {formatDistanceToNow(
                    new Date(item.accepted_at),
                    {
                      addSuffix: true,
                    }
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex flex-col items-end gap-3">
          {/* STATUS BADGE */}
          <div
            className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-sm font-medium ${config.color}`}
          >
            <StatusIcon className="w-4 h-4" />

            {config.label}
          </div>

          {/* ACTIONS */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={copyLink}
              className="rounded-xl"
            >
              <Copy className="w-4 h-4 mr-2" />

              Copy Link
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}