"use client";
import React from "react";
import {
  User,
  Heart,
  MessageCircle,
  Share2,
  Bookmark,
  MoreHorizontal,
} from "lucide-react";

interface Post {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  content: string;
  imageUrl?: string;
  createdAt: Date;
  likes: number;
  comments: number;
  bookmarks: number;
  isLiked: boolean;
}

const PostCard: React.FC<{
  post: Post;
  onLike: (id: string) => void;
  onBookmark: (id: string) => void;
}> = ({ post, onLike, onBookmark }) => {
  const formatTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000);

    const divisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
      { amount: 60, name: "second" },
      { amount: 60, name: "minute" },
      { amount: 24, name: "hour" },
      { amount: 7, name: "day" },
      { amount: 4.34524, name: "week" },
      { amount: 12, name: "month" },
      { amount: Number.POSITIVE_INFINITY, name: "year" },
    ];

    let duration = diffInSeconds;
    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      if (Math.abs(duration) < division.amount) {
        return rtf.format(Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  };

  return (
    <div className="border-b border-l border-r border-gray-200 dark:border-gray-800 p-4 transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-500 dark:bg-gray-900">
            {post.userAvatar ? (
              <img
                src={post.userAvatar}
                alt={post.userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-200 dark:text-gray-400 " />
            )}
          </div>
          <div className="flex flex-col">
            <small className="font-semibold text-xs text-gray-900 dark:text-gray-100">
              {post.userName}
            </small>
            <small className="text-xs mt-1 text-gray-500 dark:text-gray-400">
              <i className="text-xs font-normal">{formatTime(post.createdAt)}</i>
            </small>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Post Content */}
      <div className="mb-3">
        {post.imageUrl && (
          <div className="rounded-lg overflow-hidden mb-2">
            <img
              src={post.imageUrl}
              alt="Post media"
              className="w-full max-h-64 object-cover"
            />
          </div>
        )}
        <p className="text-gray-700 dark:text-gray-300  text-sm whitespace-pre-wrap">
          {post.content}
        </p>
        
      </div>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-900">
        <div className="flex items-center justify-between w-full gap-2">
          <button
            onClick={() => onLike(post.id)}
            className={`flex items-center space-x-2 px-3 py-1 rounded-full transition-colors ${
              post.isLiked
                ? "text-red-600 bg-red-50 hover:bg-red-100 dark:text-red-400 dark:bg-red-900/30 dark:hover:bg-red-900/50"
                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            }`}
          >
            <Heart className={`w-4 h-4 ${post.isLiked ? "fill-current" : ""}`} />
            <span className="text-sm">{post.likes}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{post.comments}</span>
          </button>

          <button
            onClick={() => onBookmark(post.id)}
            className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">{post.bookmarks}</span>
          </button>

          <button className="flex items-center space-x-2 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
