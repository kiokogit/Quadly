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
import NewEventBox from './NewPostBox';

dayjs.extend(relativeTime)

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
  const [addComment, setAddComment] = useState(false)

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
    <div className="pb-2 border border-gray-100 dark:border-gray-800 overflow-hidden p-4 mb-2 mt-2 m-2 rounded-md">
      
        {/* Header with User Info */}
        <div className="flex items-center justify-between pb-2">
          <div className="flex items-center space-x-3">
            <div className="w-6 h-6 rounded-full overflow-hidden border border-gray-400 flex items-center justify-center">
              {event.created_by ? (
                <img 
                  src={event.created_by?.avatar} 
                  alt={event.created_by?.first_name} 
                  className="w-full h-full object-cover" 
                />
              ) : (
                <User className="w-4 h-4 text-gray-300" />
              )}
            </div>
            <div className="flex flex-col">
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xs text-gray-900 dark:text-gray-100">
                  {event.created_by?.first_name} {event.created_by?.last_name}
                </span>
                {event.verified && (
                  <Star className="w-3 h-3 text-blue-500 fill-blue-500" />
                )}
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>Posted {dayjs(event.created_at).fromNow()}</span>
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
      <div className="">

        {/* Event Info */}
        <Link href={`/events/${event.id}`} className="mb-2">
          <div className="flex items-start justify-between ">
            <h3 className="font-bold text-base text-gray-900 dark:text-gray-100 line-clamp-2 flex-1">
              {event.title}
            </h3>
            {event.category && (
              <span className="ml-3 px-2 py-1 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 text-xs rounded-full whitespace-nowrap">
                {event.category}
              </span>
            )}
          </div>
          
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-2 line-clamp-3">
            {event.text}
          </p>

          {/* Event Details Grid */}
          <div className="grid grid-cols-2 gap-3 mb-2">
            {event.data?.e_date && 
            <div className="flex items-center space-x-3 text-xs">
              <div className="flex items-center justify-center w-5 h-5 bg-blue-100 dark:bg-blue-900/30 rounded-full">
                <Calendar className="w-3 h-3 text-blue-600 dark:text-blue-400" />
              </div>
              <div className='flex flex-col'>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {new Date(event.data?.e_date).toDateString()} <i>({dayjs(event.data?.e_date).fromNow()})</i>
                </span>
                
              </div>
            </div>}
            {event.data?.location && 
            
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center justify-center w-5 h-5 bg-green-100 dark:bg-green-900/30 rounded-full">
                <MapPin className="w-3 h-3 text-green-600 dark:text-green-400" />
              </div>
              <div className="flex-1">
                <span className="font-medium text-gray-900 dark:text-gray-100 block">
                  {event.data?.location}
                </span>
              </div>
            </div>}
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-between  border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-1">
            <button onClick={() => setAddComment(!addComment)} className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{event.comments_count || 0}</span>
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
                  <span className="text-sm">{event.interested_count || 0} Interested</span>
                </>
            </button>
          </div>
        </div>
        {addComment && <NewEventBox source={'post'} parent={event.id}/>}
      </div>
    </div>
  );
};

export default EventCard;