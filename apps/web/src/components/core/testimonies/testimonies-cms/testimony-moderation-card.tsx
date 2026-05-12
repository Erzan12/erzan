"use client";

import { useState, useTransition } from "react";
import { moderateTestimonial } from "@/lib/mail/internal-mailer/testimonials-cms";
import { Check, X, MessageSquare, Clock, Globe, Send } from "lucide-react";
import { format } from "date-fns";

export function ModerationCard({ item, type }: { item: any, type: 'pending' | 'published' }) {
  const [isPending, startTransition] = useTransition();
const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [actionType, setActionType] = useState<boolean | null>(null);

  const handleAction = (approve: boolean) => {
    startTransition(async () => {
      await moderateTestimonial(item.id, { approve });
    });
  };

//   const [isPending, startTransition] = useTransition();

  const triggerAction = (approve: boolean) => {
    setActionType(approve);
    setShowModal(true);
  };

  const handleConfirm = () => {
    startTransition(async () => {
      await moderateTestimonial(item.id, { 
        approve: actionType!, 
        feedback: feedback 
      });
      setShowModal(false);
    });
  };

  return (
    <div className="group relative bg-white dark:bg-slate-900/50 border border-slate-500/10 rounded-[2rem] p-6 mb-4 hover:border-slate-500/30 transition-all duration-300">
      <div className="flex flex-col md:flex-row gap-6 items-start">
        
        {/* User Info & Meta */}
        <div className="flex flex-col gap-4 min-w-[200px]">
          <div className="flex items-center gap-3">
            <img 
              src={item.avatar || item.user?.image || "/api/placeholder/40/40"} 
              className="w-12 h-12 rounded-full border-2 border-white dark:border-slate-800 shadow-sm"
              alt={item.name}
            />
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white leading-tight">{item.name}</h4>
              <p className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">{item.role || "Guest"}</p>
            </div>
          </div>
          
          <div className="flex flex-col gap-2 text-[12px] text-slate-400 font-medium">
            <div className="flex items-center gap-2">
              <Clock size={14} />
              {format(new Date(item.created_at), "MMM dd, yyyy")}
            </div>
            {item.is_published && (
              <div className="flex items-center gap-2 text-green-500">
                <Globe size={14} />
                Live on site
              </div>
            )}
          </div>
        </div>

        {/* Content Section */}
        <div className="flex-1 bg-slate-500/5 rounded-2xl p-5 border border-slate-500/5">
          <p className="text-slate-700 dark:text-slate-300 italic leading-relaxed text-sm">
            "{item.content}"
          </p>
          
          {item.feedback && (
            <div className="mt-4 pt-4 border-t border-slate-500/10 flex gap-2 items-start text-xs text-blue-500">
              <MessageSquare size={14} className="mt-0.5" />
              <span><strong>Admin Note:</strong> {item.feedback.my_feedback}</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-row md:flex-col gap-2">
          {type === 'pending' ? (
            <>
              <button 
                onClick={() => handleAction(true)}
                disabled={isPending}
                className="p-3 bg-green-500/10 text-green-600 rounded-xl hover:bg-green-500 hover:text-white transition-all shadow-sm"
                title="Approve"
              >
                <Check size={20} />
              </button>
              <button 
                onClick={() => handleAction(false)}
                disabled={isPending}
                className="p-3 bg-red-500/10 text-red-600 rounded-xl hover:bg-red-500 hover:text-white transition-all shadow-sm"
                title="Reject"
              >
                <X size={20} />
              </button>
            </>
          ) : (
            <button 
              onClick={() => handleAction(false)}
              disabled={isPending}
              className="p-3 bg-slate-500/10 text-slate-500 rounded-xl hover:bg-slate-900 dark:hover:bg-white dark:hover:text-slate-900 hover:text-white transition-all shadow-sm"
              title="Unpublish"
            >
              <X size={20} />
            </button>
          )}
        </div>
        {/* <div className="flex gap-2">
            <button onClick={() => triggerAction(true)} className="p-3 bg-green-500/10 text-green-600 rounded-xl"><Check /></button>
            <button onClick={() => triggerAction(false)} className="p-3 bg-red-500/10 text-red-600 rounded-xl"><X /></button>
        </div> */}

        {/* Feedback Modal */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
              <div className="bg-white dark:bg-slate-900 p-8 rounded-[2.5rem] w-full max-w-md border border-slate-500/20 shadow-2xl">
                  <h3 className="text-xl font-bold mb-2">
                      {actionType ? "Approve Testimonial?" : "Reject Testimonial?"}
                  </h3>
                  <p className="text-sm text-slate-500 mb-4">Add a message to {item.name}. This will be emailed to them.</p>
                  
                  <textarea
                      className="w-full p-4 bg-slate-500/5 rounded-2xl border-none focus:ring-2 focus:ring-primary outline-none text-sm mb-4"
                      rows={3}
                      placeholder="E.g. Thanks for the kind words! / Could you clarify..."
                      onChange={(e) => setFeedback(e.target.value)}
                  />

                  <div className="flex gap-3">
                  <button onClick={() => setShowModal(false)} className="flex-1 py-3 font-medium text-slate-500">Cancel</button>
                      <button 
                          onClick={handleConfirm} 
                          disabled={isPending}
                          className="flex-1 py-3 bg-slate-900 dark:bg-white dark:text-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-2"
                      >
                          {isPending ? "Sending..." : "Confirm & Email"}
                          <Send size={16} />
                      </button>
                  </div>
              </div>
          </div>
        )}
      </div>
    </div>
  );
}