"use client";

import { useEffect, useState } from "react";
import { Event, Gift } from "@/utils/types";
import { useParams } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import { LoadingSpinner } from "./_components/LoadingSpinner";
import { ErrorState } from "./_components/ErrorState";
import { BackLink } from "./_components/BackLink";
import { EventHeader } from "./_components/EventHeader";
import { GiftSection } from "./_components/GiftSection";

export default function EventDetailsPage() {
  const { userId } = useAuth();
  const params = useParams();
  const eventId = params?.id as string;
  const [event, setEvent] = useState<Event | null>(null);
  const [gifts, setGifts] = useState<Gift[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

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

  if (isLoading) return <LoadingSpinner />;
  if (error || !event) return <ErrorState error={error} />;

  return (
    <div className="w-full">
      <BackLink />
      <EventHeader event={event} isOwner={isOwner} onUpdate={setEvent} />
      <GiftSection gifts={gifts} isOwner={isOwner} eventId={eventId} onUpdate={setGifts} />
    </div>
  );
}
