"use client"
import { FaSearchengin, FaStarHalfAlt } from "react-icons/fa"
import { Users, Group, Calendar, Megaphone, MoreHorizontal, CalendarCheck2Icon, StarHalfIcon } from "lucide-react"
import { motion } from "framer-motion"
import Link from "next/link"
import { useSession } from "next-auth/react"

// Dummy data (replace with API later)
const events = [
  { id: 1, title: "Hackathon 2025", date: "Sep 12", location: "Auditorium" },
  { id: 2, title: "Music Night", date: "Sep 15", location: "Campus Hall" },
  { id: 3, title: "Tech Talk", date: "Sep 20", location: "Library" },
]

const ads = [
  { id: 1, title: "50% Off Pizza!", brand: "Campus Cafe" },
  { id: 2, title: "Free Gym Week", brand: "Sports Center" },
]

const articles = [
  { id: 1, title: "Why Campus Life Shapes Your Future", author: "Student Union" },
  { id: 2, title: "Top 10 Study Hacks", author: "Library Club" },
  { id: 3, title: "Balancing Fun & Studies", author: "Wellness Team" },
]

export default function YouPage() {

    const { data: session } = useSession()
    if (!session) {
            return <></>
    }
  return (
    <div className="max-w-lg mx-auto px-4 py-6 space-y-10 border-b border-t border-r border-l border-gray-200 dark:border-gray-800 p-4 transition-shadow">
      {/* Stats */}
      
      <section className="flex gap-6 justify-evenly text-center">
       
        <Link href='/forum' className="flex flex-col items-center">
          <Users className="w-6 h-6 text-blue-500 mb-1" />
         <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                myPosts <span className="text-xl leading-none">·</span> 236
            </p>
        </Link>
        <Link href="/reviews" className="flex flex-col items-center">
            <FaStarHalfAlt className="w-6 h-6 text-green-500 mb-1" />
            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                myReviews <span className="text-xl leading-none">·</span> 12
            </p>

        </Link>
         <Link href='/events' className="flex flex-col items-center">
          <CalendarCheck2Icon className="w-6 h-6 text-orange-500 mb-1" />
          <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1">
                savedEvents <span className="text-xl leading-none">·</span> 15
            </p>
        </Link>
        
      </section>

      {/* Events Carousel */}
      <section>
        <div className="flex flex-row justify-between">
            <p className="flex items-center text-medium font-bold text-gray-800 dark:text-gray-100 mb-3">
            <Calendar className="w-5 h-5 mr-2 text-purple-500" />
            Upcoming Events
            </p>
            <Link href='/events' className="text-orange-500 text-sm underline">View Latest</Link>
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2">
          {events.map((event) => (
            <motion.div
              key={event.id}
              whileHover={{ scale: 1.01 }}
              className="min-w-[150px] border border-gray-400 dark:border-gray-700 rounded-lg p-3 shadow-sm"
            >
              <p className="font-semibold ">{event.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
              <p className="text-xs text-gray-400">{event.location}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Ads Carousel */}
      <section>
        <div className="flex flex-row justify-between">
         <h2 className="flex items-center text-medium font-bold text-gray-800 dark:text-gray-100 mb-3">
          <Megaphone className="w-5 h-5 mr-2 text-pink-500" />
          Sponsored
        </h2>
        <Link href='/discover' className="text-orange-500 text-sm underline">Discover more</Link>
        </div>
       
        <div className="flex overflow-x-auto gap-2 pb-2">
          {ads.map((ad) => (
            <motion.div
              key={ad.id}
              whileHover={{ scale: 1.05 }}
              className="min-w-[175px] border border-gray-400 dark:border-gray-700 rounded-lg p-4 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 shadow-sm"
            >
              <p className="font-semibold">{ad.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{ad.brand}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Articles */}
      <section>
        <div className="flex flex-row justify-between">
        <h2 className="flex items-center text-lg font-bold text-gray-800 dark:text-gray-100 mb-3">
          Latest Posts
        </h2>
        <Link href='/forum' className="text-orange-500 text-sm underline">See all</Link>
        </div>
        <div className="divide-y divide-gray-200 dark:divide-gray-700">
          {articles.map((article) => (
            <div
              key={article.id}
              className="py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 px-2 rounded-lg transition"
            >
              <div>
                <p className="font-medium">{article.title}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  By {article.author}
                </p>
              </div>
              <MoreHorizontal className="w-5 h-5 text-gray-400" />
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
