"use client";

import { useState, useEffect } from 'react';
import { Pencil } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

interface EditableFieldProps {
  value: string;
  onSave: (value: string) => Promise<void>;
  label?: string;
  type?: 'text' | 'textarea' | 'datetime-local';
  icon?: React.ReactNode;
  className?: string;
  displayFormat?: string;
}

export function EditableField({
  value,
  onSave,
  label,
  type = 'text',
  icon,
  className = '',
  displayFormat,
}: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedValue, setEditedValue] = useState(value);
  const [isLoading, setIsLoading] = useState(false);
  const [displayValue, setDisplayValue] = useState('');

  useEffect(() => {
    if (type === 'datetime-local' && value) {
      setDisplayValue(format(new Date(value), displayFormat || 'PPP', { locale: pl }));
    } else {
      setDisplayValue(value || '');
    }
  }, [value, type, displayFormat]);

  useEffect(() => {
    setEditedValue(value);
  }, [value]);

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
      <div className={`w-full ${className}`}>
        {icon && <span className="text-blue-500">{icon}</span>}
        {type === 'textarea' ? (
          <div className="w-full mb-2">
            <textarea
              value={editedValue}
              onChange={(e) => setEditedValue(e.target.value)}
              className="w-full min-h-[120px] min-w-[300px] p-3 rounded-md border border-input bg-white text-gray-900 resize focus:outline-none focus:ring-2 focus:ring-ring shadow-sm"
              style={{ resize: 'both' }}
              autoFocus
            />
          </div>
        ) : (
          <Input
            type={type}
            value={editedValue}
            onChange={(e) => setEditedValue(e.target.value)}
            className="min-w-[300px] text-gray-900"
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
          <Button className='bg-white text-black'
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
      <span className="text-lg">
        {displayValue || 'Brak daty'}
      </span>
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