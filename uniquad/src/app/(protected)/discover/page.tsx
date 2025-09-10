
"use client"
import ContentHeader from "@/components/ContentHeader";


import React, { useState, useEffect, useRef, useCallback } from "react"
import ProductCard, { Product } from "@/components/ListingCard"

const ProductsFeed: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [page, setPage] = useState(1)
  const observerRef = useRef<IntersectionObserver | null>(null)
  const loadingRef = useRef<HTMLDivElement | null>(null)


  const handleCounts = () => {
    console.log('None')
  }

  // Mock data generator
  const generateMockProducts = (pageNum: number, count: number = 10): Product[] => {
    const titles = ["Hostel Room", "Printing Services", "Assignment Help", "Meal Plan", "Stationery Pack"]
    const locations = ["North Wing", "Library Basement", "Student Center", "Main Gate", "Dorm Block A"]

    return Array.from({ length: count }).map((_, i) => {
      const id = `${pageNum}-${i}`
      return {
        id,
        title: titles[Math.floor(Math.random() * titles.length)],
        description:
          "Affordable and reliable. Perfect for students who want quality and convenience at campus.",
        price: Math.floor(Math.random() * 100) + 10,
        location: locations[Math.floor(Math.random() * locations.length)],
        availableFrom: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        userId: `user-${Math.floor(Math.random() * 100)}`,
        userName: ["Alice", "Bob", "Carol", "David", "Emma"][Math.floor(Math.random() * 5)],
        userAvatar: `https://picsum.photos/600/300?random=${id}`,
        createdAt: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
        verified: Math.random() > 0.6,
        imageUrl: Math.random() > 0.4 ? `https://picsum.photos/600/300?random=${id}` : undefined,
        downvotes: Math.floor(Math.random() * 100),
        upvotes: Math.floor(Math.random() * 100),
        bookmarks: Math.floor(Math.random() * 10),
        comments: Math.floor(Math.random() * 100)
      }
    })
  }

  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return
    setLoading(true)

    await new Promise((res) => setTimeout(res, 1000)) // simulate API delay

    const newProducts = generateMockProducts(page)

    if (newProducts.length === 0) {
      setHasMore(false)
    } else {
      setProducts((prev) => [...prev, ...newProducts])
      setPage((prev) => prev + 1)
    }

    if (products.length + newProducts.length >= 50) {
      setHasMore(false)
    }

    setLoading(false)
  }, [page, loading, hasMore, products.length])

  useEffect(() => {
    loadMore()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (loading) return
    if (observerRef.current) observerRef.current.disconnect()

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) loadMore()
      },
      { threshold: 1 }
    )

    if (loadingRef.current) observerRef.current.observe(loadingRef.current)
    return () => observerRef.current?.disconnect()
  }, [loadMore, loading, hasMore])

  return (
    <div>
      {products.map((p) => (
        <ProductCard key={p.id} product={p} onBookmark={() => handleCounts()} onUpvote={() => handleCounts()} onDownvote={() => handleCounts()} />
      ))}

      <div ref={loadingRef} className="flex justify-center py-8">
        {loading && (
          <div className="flex items-center space-x-2 text-gray-500">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-orange-600"></div>
            <span>Loading more...</span>
          </div>
        )}
        {!hasMore && products.length > 0 && (
          <div className="text-gray-500 text-center">
            <p>🎉 You’ve reached the end of listings</p>
          </div>
        )}
      </div>
    </div>
  )
}


export default function DiscoverPage() {
  return (
    <div className="max-w-lg mx-auto">
     <ContentHeader welcomeMsg="Everything You need here..." newItemName="Listing"/>
     <ProductsFeed />
    </div>
  );
}
