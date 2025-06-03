"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { usePostHog } from 'posthog-js/react';
import { ERROR_EVENTS, createClientErrorTracker } from "@/lib/posthog-client";
import { useRouter } from "next/navigation";
import { deletePass } from "@/db/functions/deletePass";

export default function DeletePass({ passId }: { passId: string }) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const posthog = usePostHog();
  const trackError = createClientErrorTracker(posthog);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={() => {}} size="icon" variant="destructive">
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete Pass</DialogTitle>
          <DialogDescription>
            Are you sure you want to delete this pass?
          </DialogDescription>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button
              disabled={loading}
              variant="destructive"
              type="submit"
              onClick={async () => {
                setLoading(true);
                try {
                  const result = await deletePass(passId);
                  if (result) {
                    toast.success("Pass deleted successfully");
                    posthog?.capture('pass_deleted', {
                      pass_id: passId,
                      component: 'delete_pass',
                      success: true
                    });
                    router.refresh();
                  } else {
                    trackError(ERROR_EVENTS.PASS_DELETION_ERROR, "Delete operation returned false", {
                      pass_id: passId,
                      component: 'delete_pass',
                      action: 'delete_failed'
                    });
                    toast.error("Pass deleting failed");
                  }
                } catch (error) {
                  console.error("Error deleting pass:", error);
                  trackError(ERROR_EVENTS.PASS_DELETION_ERROR, error, {
                    pass_id: passId,
                    component: 'delete_pass',
                    action: 'delete_exception'
                  });
                  toast.error("Failed to delete pass");
                } finally {
                  setLoading(false);
                }
              }}
            >
              {loading ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
