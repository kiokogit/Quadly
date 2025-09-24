"use client";
import React, { useState } from 'react';
import {  
  MessageCircle, 
  Users, 
  Calendar, 
  MapPin, 
  MoreHorizontal, 
  User,
  Share2,
  Clock,
  Star,
  Bookmark,
} from 'lucide-react';
import Link from 'next/link';
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

// Event data structure
interface Event {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  title: string;
  content: string;
  e_date: Date;
  venue?: string;
  location?: string
  imageUrl?: string;
  likes_count: number;
  comments_count: number;
  interested_count: number;
  date_created: Date;
  isLiked: boolean;
  isAttending: boolean;
  verified?: boolean;
  category?: string;
  maxAttendees?: number;
}

// EventCard Component
const EventCard: React.FC<{ 
  event: Event; 
  onAttend: (id: string) => void;
  onBookmark: (id: string) => void;
  onShare: (id: string) => void;
}> = ({ 
  event, 
  onAttend,
  onBookmark,
  onShare,
}) => {
  const [isAttending, setIsAttending] = useState(event.isAttending);
  const [isBookmarked, setIsBookmarked] = useState(false);


  const handleAttend = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsAttending(!isAttending);
    onAttend(event.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(event.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(event.id);
  };

  return (
    <div className=" pb-2 shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
      
        {/* Header with User Info */}
        <div className="flex items-center justify-between p-2 mb-2 mt-2">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
              {event.userAvatar ? (
                <img 
                  src={event.userAvatar} 
                  alt={event.userName} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User className="w-6 h-6 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {event.userName}
                </span>
                {event.verified && (
                  <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Posted {dayjs(event.date_created).fromNow()}</span>
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>
      {/* Event Image with Overlay Info */}
      {event.imageUrl && (
        <div className="relative overflow-hidden">
          <img 
            src={event.imageUrl} 
            alt={event.title}
            className="w-full max-h-64 object-cover"
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          
        
          {/* Bookmark Button */}
          <div className="absolute bottom-3 right-3">
            <button
              onClick={handleBookmark}
              className="bg-black/20 backdrop-blur-sm rounded-full p-2 text-white hover:scale-110 transition-transform"
            >
              <Bookmark className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} />
            </button>
          </div>
        </div>
      )}

      {/* Content Section */}
      <div className="p-5">

        {/* Event Info */}
        <Link href={`/events/${event.id}`} className="mb-2">
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-bold text-xl text-gray-900 dark:text-gray-100 line-clamp-2 flex-1">
              {event.title}
            </h3>
            {event.category && (
              <span className="ml-3 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full whitespace-nowrap">
                {event.category}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-3">
            {event.content}
          </p>

          {/* Event Details Grid */}
          <div className="grid grid-cols-1 gap-3 mb-4">
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {dayjs(event.e_date).fromNow()}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full">
                <MapPin className="w-4 h-4 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900 dark:text-gray-100 block">
                  {event.location}
                </span>
                {event.venue && (
                  <span className="text-gray-500 dark:text-gray-400 text-xs">
                    {event.venue}
                  </span>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-1 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-1">
            
            <button className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{event.comments_count}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleAttend}
              className={`flex items-center space-x-2 font-medium `}
            >
              <>
                  <Users className="w-4 h-4" />
                  <span className="text-sm">{event.interested_count} Interested</span>
                </>
              
            </button>
            
            {/* <Link
              href={`/events/${event.id}`}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full transition-colors"
            >
              <EyeIcon className="w-3 h-3" />
            </Link> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;