"use client";
import { Heart, MessageCircle, Users, Calendar, MapPin, MoreHorizontal, User,Share2Icon, Bookmark} from 'lucide-react';
import Link from 'next/link';

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


export default EventCard

