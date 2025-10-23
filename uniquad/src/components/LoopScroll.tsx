"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import EventCard from '@/components/EventCard';
import axiosInstance from '@/lib/api-client';
import { Event } from '@/lib/types';
import { campusEvents } from '@/lib/randData';


// EventsFeed Component
const EventsFeed: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const getEvents = async() => {
    setLoading(true)
    await axiosInstance.get('/events-management/events')
    .then(res => setEvents(res.data))
    .finally(() => setLoading(false))
  }
   
  useEffect(() => {
    getEvents()
    // setEvents(campusEvents)
  }, []);



  // Handle attend
  const handleAttend = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isAttending: !event.isAttending, attending: event.interested_count + (event.isAttending ? -1 : 1) }
        : event
    ));
  };

  return (
    <div className="">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onShare={handleAttend}
        onAttend={handleAttend}
        onBookmark={handleAttend}
        />
      ))}
      
      <div 
        ref={loadingRef}
        className="flex justify-center py-8"
      >
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Fetching ...</span>
          </div>
        )}
        {!hasMore && events.length > 0 && (
          <div className="text-gray-500 text-center">
            <p>Youve reached the end of the feed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsFeed
