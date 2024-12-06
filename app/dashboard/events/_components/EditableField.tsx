"use client";

import { useState } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  label?: string;
  type?: 'text' | 'textarea' | 'datetime-local';
  icon?: React.ReactNode;
  className?: string;
}

export function EditableField({
  value,
  onSave,
  label,
  type = 'text',
  icon,
  className = ''
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    if (editedValue === value) {
      setIsEditing(false);
      return;
    }

    setIsLoading(true);
    try {
      await onSave(editedValue);
      setIsEditing(false);
      toast.success('Zapisano zmiany');
    } catch (error) {
      console.error('Błąd podczas zapisywania:', error);
      toast.error('Nie udało się zapisać zmian');
    } finally {
      setIsLoading(false);
    }
  };

  if (isEditing) {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {icon && <span className="text-blue-500">{icon}</span>}
        {type === 'textarea' ? (
          <Textarea
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="min-w-[300px]"
            autoFocus
          />
        ) : (
          <Input
            type={type}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="min-w-[300px]"
            autoFocus
          />
        )}
        <div className="flex gap-2">
          <Button 
            onClick={handleSave} 
            disabled={isLoading}
            size="sm"
          >
            {isLoading ? 'Zapisywanie...' : 'Zapisz'}
          </Button>
          <Button 
            onClick={() => {
              setIsEditing(false);
              setEditedValue(value);
            }}
            variant="outline"
            size="sm"
          >
            Anuluj
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex items-center gap-2 group ${className}`}>
      {icon && <span className="text-blue-500">{icon}</span>}
      <span className="text-lg">{value}</span>
      <button
        onClick={() => setIsEditing(true)}
        className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-gray-100 rounded"
        title="Edytuj"
      >
        <Pencil className="h-4 w-4 text-gray-500" />
      </button>
    </div>
  );
} 