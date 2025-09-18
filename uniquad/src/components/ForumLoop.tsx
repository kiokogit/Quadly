"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import PostCard from "@/components/GeneralPostCard";

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

const Feed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadingRef = useRef<HTMLDivElement | null>(null);

  // Mock generator
  const generateMockPosts = (pageNum: number, count: number = 10): Post[] => {
    const posts: Post[] = [];
    const names = ["Alice", "Bob", "Carol", "David", "Emma"];
    const contents = [
      "Just had the best food at the cafeteria!",
      "Campus politics are heating up...",
      "Who’s down for football this weekend?",
      "Big assignment deadline coming up.",
      "Coffee at the library saved my life today.",
    ];

    for (let i = 0; i < count; i++) {
      const id = `${pageNum}-${i}`;
      posts.push({
        id,
        userId: `user-${Math.floor(Math.random() * 100)}`,
        userName: names[Math.floor(Math.random() * names.length)],
        content: contents[Math.floor(Math.random() * contents.length)],
        imageUrl: Math.random() > 0.7 ? `https://picsum.photos/600/300?random=${id}` : undefined,
        createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        likes: Math.floor(Math.random() * 100),
        comments: Math.floor(Math.random() * 50),
        bookmarks: Math.floor(Math.random() * 20),
        isLiked: Math.random() > 0.7,
      });
    }
    return posts;
  };

  // Load more
  const loadMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newPosts = generateMockPosts(page);
    if (newPosts.length === 0) {
      setHasMore(false);
    } else {
      setPosts((prev) => [...prev, ...newPosts]);
      setPage((prev) => prev + 1);
    }
    if (posts.length + newPosts.length >= 50) setHasMore(false);
    setLoading(false);
  }, [page, loading, hasMore, posts.length]);

  useEffect(() => {
    loadMorePosts();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loading) return;
    if (observerRef.current) observerRef.current.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );
    if (loadingRef.current) {
      observerRef.current.observe(loadingRef.current);
    }
    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [loadMorePosts, loading, hasMore]);

  // Handlers
  const handleLike = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, isLiked: !p.isLiked, likes: p.likes + (p.isLiked ? -1 : 1) }
          : p
      )
    );
  };

  const handleBookmark = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, bookmarks: p.bookmarks + 1 }
          : p
      )
    );
  };

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          onLike={handleLike}
          onBookmark={handleBookmark}
        />
      ))}
      <div ref={loadingRef} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <span>Loading more...</span>
          </div>
        )}
        {!hasMore && posts.length > 0 && (
          <div className="text-gray-500 text-center">
            <p>You’ve reached the end of the feed</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Feed