"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Share, Copy } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { ApplePass } from "@/lib/types";
import QRCode from "./qr-code";

export default function ShareModal({ pass }: { pass: ApplePass }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button size="sm" variant="outline">
          <Share />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Share Pass</DialogTitle>
          <DialogDescription>Share your pass with others</DialogDescription>
        </DialogHeader>
        <QRCode pass={pass as ApplePass} size={375} />
        <div className="flex items-center gap-2">
          <Input
            disabled
            className="w-full"
            placeholder="Enter email"
            value={`${process.env.NEXT_PUBLIC_APP_URL}/share/pass/${pass?.pass_share_id}`}
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => {
              navigator.clipboard.writeText(
                `${process.env.NEXT_PUBLIC_APP_URL}/share/pass/${pass?.pass_share_id}`,
              );
              toast.success("Pass copied to clipboard");
            }}
          >
            <Copy />
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
