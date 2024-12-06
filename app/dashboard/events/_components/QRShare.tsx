import { QRCodeSVG } from 'qrcode.react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger, DialogTitle } from "@/components/ui/dialog";
import { useState, useEffect } from 'react';

interface QRShareProps {
  eventId: string;
  shortCode: string;
}

export function QRShare({ eventId, shortCode }: QRShareProps) {
  const [shareUrl, setShareUrl] = useState('');
  
  useEffect(() => {
    setShareUrl(`${window.location.origin}/e/${shortCode}`);
  }, [shortCode]);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareUrl);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="bg-white/10 hover:bg-white/20 text-white border-white/20">
          Udostępnij wydarzenie
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogTitle>Udostępnij wydarzenie</DialogTitle>
        <div className="flex flex-col items-center gap-4 p-4">
          <QRCodeSVG value={shareUrl} size={200} />
          <div className="flex items-center gap-2">
            <input
              type="text"
              value={shareUrl}
              readOnly
              className="p-2 border rounded"
            />
            <Button onClick={copyToClipboard}>
              Kopiuj
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 