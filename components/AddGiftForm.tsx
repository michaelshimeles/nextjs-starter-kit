'use client';

import { useState } from 'react';

export function AddGiftForm({ eventId }: { eventId: string }) {
  const [giftData, setGiftData] = useState({
    name: '',
    price: '',
    store: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await fetch(`/api/events/${eventId}/gifts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(giftData),
      });
      
      // Reset form and refresh gifts list
      setGiftData({ name: '', price: '', store: '' });
    } catch (error) {
      console.error('Error adding gift:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Gift name"
        value={giftData.name}
        onChange={(e) => setGiftData({...giftData, name: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="number"
        placeholder="Price (PLN)"
        value={giftData.price}
        onChange={(e) => setGiftData({...giftData, price: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        placeholder="Store"
        value={giftData.store}
        onChange={(e) => setGiftData({...giftData, store: e.target.value})}
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="bg-teal-500 text-white px-4 py-2 rounded"
      >
        Add Gift
      </button>
    </form>
  );
} 