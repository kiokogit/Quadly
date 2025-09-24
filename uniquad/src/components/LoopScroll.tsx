"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import EventCard from '@/components/EventCard';
import axiosInstance from '@/lib/api-client';
import { Event } from '@/lib/types';


// EventsFeed Component
const EventsFeed: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  const getEvents = async() => {
    setLoading(true)
    await axiosInstance.get('/events-management/events')
    .then(res => setEvents(res.data))
    .finally(() => setLoading(false))
  }
   
  // // Mock data generator
  // const generateMockEvents = (pageNum: number, count: number = 10): Event[] => {
  //   const events: Event[] = [];
  //   const names = ['Alice Chen', 'Bob Johnson', 'Carol Davis', 'David Wilson', 'Emma Brown'];
  //   const locations = ['Student Center', 'Library Hall', 'Campus Quad', 'Cafeteria', 'Gym'];
  //   const scopes: ('public' | 'friends' | 'private')[] = ['public', 'friends', 'private'];
    
  //   for (let i = 0; i < count; i++) {
  //     const id = `${pageNum}-${i}`;
  //     const eventDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000); // Next 7 days
      
  //     events.push({
  //       id,
  //       userId: `user-${Math.floor(Math.random() * 100)}`,
  //       userName: names[Math.floor(Math.random() * names.length)],
  //       title: `Campus Event ${id}`,
  //       description: `Join us for an amazing event! This will be a great opportunity to connect with fellow students and have fun. Don't miss out on this exciting experience.`,
  //       eventTime: eventDate,
  //       location: locations[Math.floor(Math.random() * locations.length)],
  //       scope: scopes[Math.floor(Math.random() * scopes.length)],
  //       imageUrl: Math.random() > 0.5 ? `https://picsum.photos/600/300?random=${id}` : undefined,
  //       likes: Math.floor(Math.random() * 100),
  //       comments: Math.floor(Math.random() * 50),
  //       attending: Math.floor(Math.random() * 200),
  //       createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Last 24 hours
  //       isLiked: Math.random() > 0.7,
  //       isAttending: Math.random() > 0.8,
  //       bookmarks:Math.floor(Math.random() * 200)
  //     });
  //   }
    
  //   return events;
  // };

  // Load more events
 


  useEffect(() => {
    getEvents()
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
