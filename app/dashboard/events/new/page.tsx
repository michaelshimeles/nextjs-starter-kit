'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@clerk/nextjs';

export default function CreateEventPage() {
  const router = useRouter();
  const { userId } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [eventData, setEventData] = useState({
    title: '',
    description: '',
    location: '',
    eventDate: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/events', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(eventData),
      });

      const result = await response.json();

      if (result.status === 400) {
        setError(result.message);
        return;
      }

      if (result.data?.[0]?.id) {
        router.push(`/dashboard/events/${result.data[0].id}`);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd podczas tworzenia wydarzenia');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Create New Event</h1>
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-2">Event Title</label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => setEventData({...eventData, title: e.target.value})}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-2">Description</label>
          <textarea
            value={eventData.description}
            onChange={(e) => setEventData({...eventData, description: e.target.value})}
            className="w-full p-2 border rounded"
            rows={4}
          />
        </div>
        <div>
          <label className="block mb-2">Location</label>
          <input
            type="text"
            value={eventData.location}
            onChange={(e) => setEventData({...eventData, location: e.target.value})}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <div>
          <label className="block mb-2">Event Date</label>
          <input
            type="datetime-local"
            value={eventData.eventDate}
            onChange={(e) => setEventData({...eventData, eventDate: e.target.value})}
            className="w-full p-2 border rounded"
            required
            disabled={isLoading}
          />
        </div>
        <button
          type="submit"
          className="bg-pink-500 text-white px-6 py-2 rounded-full hover:bg-pink-600 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? 'Creating...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
}