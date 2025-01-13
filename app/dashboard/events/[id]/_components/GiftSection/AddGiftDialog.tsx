import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddGiftForm } from "../../../_components/AddGiftForm";
import { Plus } from "lucide-react";
import { useState } from "react";

interface AddGiftDialogProps {
  eventId: string;
  onSuccess: () => void;
}

export function AddGiftDialog({ eventId, onSuccess }: AddGiftDialogProps) {
  const [open, setOpen] = useState(false);

  const handleSuccess = () => {
    onSuccess();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-700 text-white hover:from-indigo-700 hover:to-purple-800 transform hover:-translate-y-0.5 transition-all duration-300 font-semibold shadow-[0_0_20px_rgba(129,140,248,0.5)] hover:shadow-[0_0_25px_rgba(129,140,248,0.7)] border-2 border-indigo-300/50 px-6 py-3">
          <Plus className="h-5 w-5 mr-2" />
          Dodaj prezent
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Dodaj nowy prezent</DialogTitle>
        <AddGiftForm 
          eventId={eventId} 
          onSuccess={handleSuccess}
          onCancel={() => setOpen(false)} 
        />
      </DialogContent>
    </Dialog>
  );
} 