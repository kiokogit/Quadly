"use client";
import React, { useState } from "react";
import {
  MapPin,
  MoreHorizontal,
  MessageCircle,
  Share2,
  Heart,
  Bookmark,
  Eye,
  Clock,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";
import { BiCheckCircle } from "react-icons/bi";

export interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  availableFrom: Date;
  imageUrl?: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  createdAt: Date;
  verified: boolean;
  comments: number;
  upvotes: number;
  downvotes: number;
  bookmarks: number;
  views?: number;
}

const ProductCard: React.FC<{
  product: Product;
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  onBookmark: (id: string) => void;
  onShare: (id: string) => void;
}> = ({ 
  product, 
  onUpvote, 
  onBookmark, 
  onShare
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);

  const formatTime = (date: Date) => {
    const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });
    const diffInSeconds = Math.floor((Date.now() - date.getTime()) / 1000);

    const divisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
      { amount: 60, name: "second" },
      { amount: 60, name: "minute" },
      { amount: 24, name: "hour" },
      { amount: 7, name: "day" },
      { amount: 4.34524, name: "week" },
      { amount: 12, name: "month" },
      { amount: Number.POSITIVE_INFINITY, name: "year" },
    ];

    let duration = Math.abs(diffInSeconds);
    for (let i = 0; i < divisions.length; i++) {
      const division = divisions[i];
      if (duration < division.amount) {
        return rtf.format(-Math.round(duration), division.name);
      }
      duration /= division.amount;
    }
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-KE', {
      style: 'currency',
      currency: 'KES',
      minimumFractionDigits: 0
    }).format(price);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    onUpvote(product.id);
  };

  const handleBookmark = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    onBookmark(product.id);
  };

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    onShare(product.id);
  };

  const handleContactSeller = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className=" mb-2 shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="flex items-center justify-between p-2">
          <div className="flex items-center space-x-3">
            {/* <div className="w-10 h-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
              {product.userAvatar ? (
                <img
                  src={product.userAvatar}
                  alt={product.userName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="w-5 h-5 text-white" />
              )}
            </div> */}
            <div className="flex flex-col">
              <div className="flex items-center space-x-1">
                {/* <span className="font-semibold text-sm text-gray-900 dark:text-gray-100">
                  {product.userName}
                </span> */}
                
              </div>
              <div className="flex items-center space-x-1 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{formatTime(product.createdAt)}</span>
                {product.verified && (
                  <BiCheckCircle className="w-4 h-4 text-blue-500 fill-blue-500" />
                )}
              </div>
            </div>
          </div>
          <button className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

      {/* Image Section */}
      {product.imageUrl && (
        <div className="relative overflow-hidden">
          <img
            src={product.imageUrl}
            alt={product.title}
            className="w-full max-h-64 object-cover"
          />
          <div className="absolute top-3 right-3 bg-black/20 backdrop-blur-sm rounded-full p-2">
            <button
              onClick={handleBookmark}
              className="text-white hover:scale-110 transition-transform"
            >
              <Bookmark 
                className={`w-4 h-4 ${isBookmarked ? 'fill-white' : ''}`} 
              />
            </button>
          </div>
          {product.views && (
            <div className="absolute bottom-3 right-3 bg-black/40 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1">
              <Eye className="w-3 h-3 text-white" />
              <span className="text-xs text-white font-medium">{product.views}</span>
            </div>
          )}
        </div>
      )}

      {/* Content Section */}
      <div className="p-4">
        {/* Header with User Info */}
        
        {/* Product Info */}
        <Link href={`/discover/${product.id}`} className="mb-4">
          <h3 className="font-bold text-lg text-gray-900 dark:text-gray-100 mb-2 line-clamp-2">
            {product.title}
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Price and Location */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-1">
              <span className="text-2xl font-bold text-green-600 dark:text-green-400">
                {formatPrice(product.price)}
              </span>
            </div>
            <div className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400">
              <MapPin className="w-4 h-4" />
              <span>{product.location}</span>
            </div>
          </div>
        </Link>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
          <div className="flex items-center space-x-1">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-1 px-3 py-2 rounded-full transition-all ${
                isLiked 
                  ? 'bg-red-50 text-red-500 dark:bg-red-900/20 dark:text-red-400' 
                  : 'text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800'
              }`}
            >
              <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
              <span className="text-sm font-medium">{product.upvotes + (isLiked ? 1 : 0)}</span>
            </button>

            <button className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm font-medium">{product.comments}</span>
            </button>

            <button
              onClick={handleShare}
              className="flex items-center space-x-1 px-3 py-2 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800 transition-colors"
            >
              <Share2 className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center space-x-2">
            
            <Link
              href={`/discover/${product.id}`}
              className="flex items-center space-x-1 px-4 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-800 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm font-medium rounded-full transition-colors"
            >
              <span>Locate</span>
              <ChevronRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;