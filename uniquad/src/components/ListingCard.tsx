"use client";
import React from "react";
import {
  User,
  MapPin,
  Star,
  MoreHorizontal,
  MessageCircle,
  ThumbsUp,
  ThumbsDown,
  Share2,
  Bookmark,
} from "lucide-react";
import Link from "next/link";

export interface Product {
  id: string
  title: string
  description: string
  price: number
  location: string
  availableFrom: Date
  imageUrl?: string
  userId: string
  userName: string
  userAvatar?: string
  createdAt: Date
  verified: boolean
  comments: number;
  upvotes: number;
  downvotes: number;
  bookmarks: number;
}

const ProductCard: React.FC<{
  product: Product;
  onUpvote: (id: string) => void;
  onDownvote: (id: string) => void;
  onBookmark: (id: string) => void;
}> = ({ product, onUpvote, onDownvote, onBookmark }) => {
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
    <div className="border-b border-l border-r border-gray-200 dark:border-gray-800 p-4 cursor-pointer transition-shadow">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-full flex items-center justify-center bg-gray-500 dark:bg-gray-900">
            {product.userAvatar ? (
              <img
                src={product.userAvatar}
                alt={product.userName}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              <User className="w-5 h-5 text-gray-200 dark:text-gray-400 " />
            )}
          </div>
          <div className="flex flex-col">
            <small className="font-semibold text-xs text-gray-900 dark:text-gray-100 flex items-center gap-1">
              {product.userName}
              {product.verified && (
                <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              )}
            </small>
            <small className="text-xs mt-1 text-gray-500 dark:text-gray-400">
              <i className="text-xs font-normal">{formatTime(product.createdAt)}</i>
            </small>
          </div>
        </div>
        <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full">
          <MoreHorizontal className="w-4 h-4 text-gray-500 dark:text-gray-400" />
        </button>
      </div>

      {/* Product Content */}
      <Link href={`/products/${product.id}`} className="mb-3">
        {product.imageUrl && (
          <div className="rounded-lg overflow-hidden mb-3">
            <img
              src={product.imageUrl}
              alt={product.title}
              className="w-full max-h-64 object-cover"
            />
          </div>
        )}
        <h3 className="font-bold text-md text-gray-900 dark:text-gray-100 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-700 dark:text-gray-300 mb-3 text-sm">
          {product.description}
        </p>

        {/* Product Details */}
        <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-3">
          <div className="flex items-center space-x-1">
            <MapPin className="w-4 h-4" />
            <span>{product.location}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span className="font-semibold text-green-600 dark:text-green-400">
              KES {product.price}
            </span>
          </div>
          <div className="flex items-center space-x-1">
            <span>Available: {product.availableFrom.toLocaleDateString()}</span>
          </div>
        </div>
      </Link>

      {/* Interaction Buttons */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-900">
        <div className="flex items-center justify-between w-full gap-2">
          <button
            onClick={() => onUpvote(product.id)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <ThumbsUp className="w-4 h-4" />
            <span className="text-sm">{product.upvotes}</span>
          </button>

          <button
            onClick={() => onDownvote(product.id)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <ThumbsDown className="w-4 h-4" />
            <span className="text-sm">{product.downvotes}</span>
          </button>

          <button className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <MessageCircle className="w-4 h-4" />
            <span className="text-sm">{product.comments}</span>
          </button>

          <button
            onClick={() => onBookmark(product.id)}
            className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors"
          >
            <Bookmark className="w-4 h-4" />
            <span className="text-sm">{product.bookmarks}</span>
          </button>

          <button className="flex items-center space-x-1 px-3 py-1 rounded-full text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
