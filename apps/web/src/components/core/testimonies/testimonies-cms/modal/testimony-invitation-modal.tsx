"use client";

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { sendInvitationAction } from "@/lib/actions/testimonials-cms";

export function SendInvitationModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm">
          Send Invitation
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogTitle>
          Send Invitation
        </DialogTitle>

        <DialogDescription>
          Enter an email to send a testimonial invitation.
        </DialogDescription>

        <form action={sendInvitationAction} className="space-y-4 mt-4">
          <Input
            name="email"
            type="email"
            placeholder="client@email.com"
          />

          <Button
            type="submit"
            className="w-full rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all shadow-sm"
          >
            Send
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}