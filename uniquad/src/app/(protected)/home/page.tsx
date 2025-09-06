"use client";
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Heart, MessageCircle, Users, Calendar, MapPin, MoreHorizontal, User,Share2Icon, Bookmark} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import NewEventBox from '@/components/NewPostBox';

// Mock event data structure
interface Event {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  description: string;
  eventTime: Date;
  location: string;
  scope: 'public' | 'friends' | 'private';
  imageUrl?: string;
  likes: number;
  comments: number;
  attending: number;
  createdAt: Date;
  isLiked: boolean;
  isAttending: boolean;
  bookmarks: number
}

// EventCard Component
const EventCard: React.FC<{ event: Event; onLike: (id: string) => void; onAttend: (id: string) => void }> = ({ 
  event, 
  onLike, 
  onAttend 
}) => {
  const formatTime = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000)

  const divisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 7, name: "day" },
    { amount: 4.34524, name: "week" },
    { amount: 12, name: "month" },
    { amount: Number.POSITIVE_INFINITY, name: "year" },
  ]

  let duration = diffInSeconds
  for (let i = 0; i < divisions.length; i++) {
    const division = divisions[i]
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}


  const formatEventTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  const getScopeColor = (scope: string) => {
  switch (scope) {
    case 'public':
      return 'text-green-600 bg-green-100 dark:text-green-400 dark:bg-green-900/30';
    case 'friends':
      return 'text-blue-600 bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30';
    case 'private':
      return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
    default:
      return 'text-gray-600 bg-gray-100 dark:text-gray-300 dark:bg-gray-700';
  }
};


  return (
    <div className="border-b border-l border-r border-gray-200 dark:border-gray-800 p-4 cursor-pointer transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
  <div className="flex items-center space-x-3">
    <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-500 dark:bg-gray-900">
      {event.userAvatar ? (
        <img 
          src={event.userAvatar} 
          alt={event.userName} 
          className="w-full h-full rounded-full object-cover" 
        />
      ) : (
        <User className="w-5 h-5 text-gray-200 dark:text-gray-400 " />
      )}
    </div>
    <div className="flex flex-col">
      <small className="font-semibold text-xs text-gray-900 dark:text-gray-100">
        {event.userName}
      </small>
      <small className="text-xs mt-1 text-gray-500 dark:text-gray-400">
        <i className="text-xs font-normal">
            @{event.userId.length > 8 ? event.userId.slice(0, 8) + "…" : event.userId}
        </i>
        <span className="mx-1">•</span>
        <i className="text-xs font-normal">{formatTime(event.createdAt)}</i>
        
      </small>
    </div>
  </div>
  <div className="flex items-center space-x-2">
    <span
      className={`px-2 py-1 rounded-full text-xs font-medium ${getScopeColor(event.scope)}`}
    >
      {event.scope}
    </span>
    <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
      <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
    </button>
  </div>
</div>


     {/* Event Content */}
<Link href={`/posts/${event.id}`} className="mb-3">
{/* Event Image */}
  {event.imageUrl && (
    <div className="rounded-lg overflow-hidden mb-3">
      <img 
        src={event.imageUrl} 
        alt={event.title}
        className="w-full max-h-64 object-cover"
      />
    </div>
  )}
  <h3 className="font-bold text-md text-gray-900 dark:text-gray-100 mb-2">{event.title}</h3>
  <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">{event.description}</p>
  
  {/* Event Details */}
  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
    <div className="flex items-center space-x-1">
      <Calendar className="w-4 h-4" />
      <span>{formatEventTime(event.eventTime)}</span>
    </div>
    <div className="flex items-center space-x-1">
      <MapPin className="w-4 h-4" />
      <span>{event.location}</span>
    </div>
  </div>

  
</Link>


      {/* Interaction Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-900">
  <div className="flex items-center justify-between w-full">
    <button 
      onClick={() => onLike(event.id)}
      className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
        event.isLiked 
          ? 'text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-900/50' 
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
    >
      <Heart className={`w-4 h-4 ${event.isLiked ? 'fill-current' : ''}`} />
      <span className="text-sm">{event.likes}</span>
    </button>
    
    <button className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
      <MessageCircle className="w-4 h-4" />
      <span className="text-sm">{event.comments}</span>
    </button>
    
    <button 
      onClick={() => onAttend(event.id)}
      className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
        event.isAttending 
          ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50' 
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}
    >
      <Users className="w-4 h-4" />
      <span className="text-sm">{event.attending}</span>
    </button>
     <button className={`flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors ${
        event.isAttending 
          ? 'text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-900/30 dark:hover:bg-blue-900/50' 
          : 'text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700'
      }`}>
      <Bookmark className="w-4 h-4" />
      <span className="text-sm">{event.bookmarks}</span>
    </button>
    
    <button className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
      <Share2Icon className="w-4 h-4" />
    </button>
    
   
  </div>
</div>

    </div>
  );
};

// EventsFeed Component
const EventsFeed: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);
   
  // Mock data generator
  const generateMockEvents = (pageNum: number, count: number = 10): Event[] => {
    const events: Event[] = [];
    const names = ['Alice Chen', 'Bob Johnson', 'Carol Davis', 'David Wilson', 'Emma Brown'];
    const locations = ['Student Center', 'Library Hall', 'Campus Quad', 'Cafeteria', 'Gym'];
    const scopes: ('public' | 'friends' | 'private')[] = ['public', 'friends', 'private'];
    
    for (let i = 0; i < count; i++) {
      const id = `${pageNum}-${i}`;
      const eventDate = new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000); // Next 7 days
      
      events.push({
        id,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        userName: names[Math.floor(Math.random() * names.length)],
        title: `Campus Event ${id}`,
        description: `Join us for an amazing event! This will be a great opportunity to connect with fellow students and have fun. Don't miss out on this exciting experience.`,
        eventTime: eventDate,
        location: locations[Math.floor(Math.random() * locations.length)],
        scope: scopes[Math.floor(Math.random() * scopes.length)],
        imageUrl: Math.random() > 0.5 ? `https://picsum.photos/600/300?random=${id}` : undefined,
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
        attending: Math.floor(Math.random() * 200),
        createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000), // Last 24 hours
        isLiked: Math.random() > 0.7,
        isAttending: Math.random() > 0.8,
        bookmarks:Math.floor(Math.random() * 200)
      });
    }
    
    return events;
  };

  // Load more events
  const loadMoreEvents = useCallback(async () => {
    if (loading || !hasMore) return;
    
    setLoading(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newEvents = generateMockEvents(page);
    
    if (newEvents.length === 0) {
      setHasMore(false);
    } else {
      setEvents(prev => [...prev, ...newEvents]);
      setPage(prev => prev + 1);
    }
    
    // Stop loading after 50 events for demo
    if (events.length + newEvents.length >= 50) {
      setHasMore(false);
    }
    
    setLoading(false);
  }, [page, loading, hasMore, events.length]);

  // Initial load
  useEffect(() => {
    loadMoreEvents();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Intersection observer for infinite scroll
  useEffect(() => {
    if (loading) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreEvents();
        }
      },
      { threshold: 1 }
    );

    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [loadMoreEvents, loading, hasMore]);

  // Handle like
  const handleLike = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isLiked: !event.isLiked, likes: event.likes + (event.isLiked ? -1 : 1) }
        : event
    ));
  };

  // Handle attend
  const handleAttend = (eventId: string) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId 
        ? { ...event, isAttending: !event.isAttending, attending: event.attending + (event.isAttending ? -1 : 1) }
        : event
    ));
  };

  return (
    <div className="max-w-lg mx-auto">
       <div className="border-b border-t border-r border-l border-gray-200 dark:border-gray-800 p-4 transition-shadow">
      {/* Header */}
      <NewEventBox />

    </div>
      {events.map(event => (
        <EventCard 
          key={event.id} 
          event={event} 
          onLike={handleLike}
          onAttend={handleAttend}
        />
      ))}
      
      {/* Loading indicator */}
      <div 
        ref={loadingRef}
        className="flex justify-center py-8"
      >
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading more events...</span>
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

const ForYouPage: React.FC = () => {
  return (
    
        <EventsFeed />
      
  );
};

export default ForYouPage;
