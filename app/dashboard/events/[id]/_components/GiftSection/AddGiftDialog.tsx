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
        <Button className="bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg shadow-md">
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