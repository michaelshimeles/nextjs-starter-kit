"use client";

import { useEffect, useState, useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Event, Gift } from "@/utils/types";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { AddGiftForm } from "../_components/AddGiftForm";
import { GiftCard } from "../_components/GiftCard";
import { QRShare } from "../_components/QRShare";
import { EditableField } from "../_components/EditableField";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { toast } from "sonner";

export default function EventDetailsPage() {
  const { userId } = useAuth();
  const params = useParams();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const isOwner = event?.user_id === userId;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const [eventResponse, giftsResponse] = await Promise.all([
          fetch(`/api/events/${eventId}`),
          fetch(`/api/events/${eventId}/gifts`),
        ]);

        const eventData = await eventResponse.json();
        const giftsData = await giftsResponse.json();

        if (eventData.error) {
          setError(eventData.error);
          return;
        }

        setEvent(eventData.data);
        setGifts(giftsData.data || []);
      } catch (err) {
        setError("Nie udało się pobrać danych wydarzenia");
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchData();
    }
  }, [eventId]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[90vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || !event) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[90vh]">
        <p className="text-red-500 mb-4">{error || "Nie znaleziono wydarzenia"}</p>
        <Button onClick={() => window.location.reload()}>Spróbuj ponownie</Button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Link powrotu */}
      <div className="mb-6">
        <Link href="/dashboard/events" className="flex items-center gap-2 text-blue-500 hover:underline">
          <ArrowLeft className="h-5 w-5" />
          <span>Powrót do listy</span>
        </Link>
      </div>

      {/* Nagłówek wydarzenia */}
      <div className="max-w-3xl sm:max-w-screen-xl mx-auto shadow-lg border border-gray-200 rounded-lg">
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 p-6 text-white rounded-t-lg">
          <div className="flex justify-between items-start">
            <div>
              {isOwner ? (
                <EditableField
                  value={event.title}
                  className="text-3xl font-bold text-white drop-shadow-md"
                  onSave={async (newValue) => {
                    const response = await fetch(`/api/events/${eventId}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ title: newValue }),
                    });
                    if (!response.ok) {
                      throw new Error("Nie udało się zaktualizować tytułu");
                    }
                    setEvent({ ...event, title: newValue });
                  }}
                />
              ) : (
                <h1 className="text-3xl font-bold">{event.title}</h1>
              )}
              {isOwner ? (
                <EditableField
                  value={event.description || ""}
                  type="textarea"
                  className="mt-2 text-white/90"
                  onSave={async (newValue) => {
                    const response = await fetch(`/api/events/${eventId}`, {
                      method: "PATCH",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({ description: newValue }),
                    });
                    if (!response.ok) {
                      throw new Error("Nie udało się zaktualizować opisu");
                    }
                    setEvent({ ...event, description: newValue });
                  }}
                />
              ) : (
                event.description && <p className="mt-2 text-white/90">{event.description}</p>
              )}
            </div>
          </div>
        </div>

        {/* Szczegóły wydarzenia */}
        <div className="p-6 bg-gray-100 space-y-4">
          {isOwner ? (
            <EditableField
              value={event.location}
              icon={<MapPinIcon className="h-6 w-6" />}
              onSave={async (newValue) => {
                const response = await fetch(`/api/events/${eventId}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ location: newValue }),
                });
                if (!response.ok) {
                  throw new Error("Nie udało się zaktualizować lokalizacji");
                }
                setEvent({ ...event, location: newValue });
              }}
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <MapPinIcon className="h-6 w-6 text-blue-500" />
              <span className="text-lg">{event.location}</span>
            </div>
          )}

          {isOwner ? (
            <EditableField
              value={event.event_date}
              type="datetime-local"
              icon={<CalendarIcon className="h-6 w-6" />}
              onSave={async (newValue) => {
                const response = await fetch(`/api/events/${eventId}`, {
                  method: "PATCH",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({ event_date: newValue }),
                });
                if (!response.ok) {
                  throw new Error("Nie udało się zaktualizować daty");
                }
                setEvent({ ...event, event_date: newValue });
              }}
            />
          ) : (
            <div className="flex items-center gap-2 text-gray-600">
              <CalendarIcon className="h-6 w-6 text-blue-500" />
              <span className="text-lg">
                {new Date(event.event_date).toLocaleString()}
              </span>
            </div>
          )}

          {/* Dodawanie prezentu */}
          {isOwner && (
            <div className="flex justify-center mt-6">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-to-r from-green-400 to-teal-500 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg shadow-md">
                    Dodaj prezent
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogTitle>Dodaj nowy prezent</DialogTitle>
                  <div className="grid gap-4 py-4">
                    <AddGiftForm
                      eventId={eventId}
                      onSuccess={() => window.location.reload()}
                    />
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          )}

          {/* Lista prezentów */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
            {gifts.map((gift) => (
              <GiftCard
                key={gift.id}
                gift={{...gift, store: gift.store || ''}}
                isOwner={isOwner}
                className="transition-all duration-200 transform hover:scale-105 shadow hover:shadow-lg rounded-lg border border-gray-200 bg-white"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
