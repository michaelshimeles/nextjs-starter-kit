import { Button } from "@/components/ui/button";

export function ErrorState({ error }: { error: string | null }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[90vh]">
      <p className="text-red-500 mb-4">{error || "Nie znaleziono wydarzenia"}</p>
      <Button onClick={() => window.location.reload()}>Spróbuj ponownie</Button>
    </div>
  );
} 