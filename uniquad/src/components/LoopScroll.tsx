"use client";
import React, { useEffect} from 'react';
import EventCard from '@/components/EventCard';
import { useEventsStore } from '@/stores/postsStore';


const EventsFeed: React.FC = () => {

  const { events, fetchEvents } = useEventsStore()

  useEffect(() => {
    fetchEvents()
  }, [fetchEvents])


  return (
    <div className="">
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
        />
      ))}
    </div>
  );
};

export default EventsFeed
