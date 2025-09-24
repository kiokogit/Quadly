"use client"
import { Calendar, Megaphone, MoreHorizontal} from "lucide-react"
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
  { id: 3, title: "Learn Forex", brand: "Forex Gurus" },
  { id: 4, title: "Free Gym Week", brand: "Sports Center" },
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
    <div className="p-4 transition-shadow">
     
      {/* Events Carousel */}
      <section className="mb-6">
        <div className="flex flex-row justify-between">
            <p className="flex items-center text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">
            <Calendar className="w-5 h-5 mr-2 text-purple-500" />
            Upcoming Events
            </p>
            <Link href='/events' className="text-orange-500 text-sm underline">View Latest</Link>
        </div>
        
        <div className="flex overflow-x-auto gap-2 pb-2 
             [scrollbar-width:thin] [scrollbar-color:#cccc_transparent] 
             [&::-webkit-scrollbar]:h-1
             [&::-webkit-scrollbar-track]:bg-transparent 
             [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full"
>
          {events.map((event) => (
            <Link href={`/events/${event.id}`}
              key={event.id}
              className="min-w-[150px] dark:bg-gray-900 border border-gray-400 dark:border-gray-700 rounded-lg p-3 shadow-sm"
            >
              <p className="font-semibold text-sm ">{event.title}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">{event.date}</p>
              <p className="text-xs text-gray-400">{event.location}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Ads Carousel */}
      <section className="mb-6">
        <div className="flex flex-row justify-between">
         <h2 className="flex items-center text-sm font-bold text-gray-800 dark:text-gray-100 mb-3">
          <Megaphone className="w-5 h-5 mr-2 text-pink-500" />
          Sponsored
        </h2>
        <Link href='/discover' className="text-orange-500 text-sm underline">Discover more</Link>
        </div>
       
        <div  className="flex overflow-x-auto gap-2 pb-2 
             [scrollbar-width:thin] [scrollbar-color:#cccc_transparent] 
             [&::-webkit-scrollbar]:h-1
             [&::-webkit-scrollbar-track]:bg-transparent 
             [&::-webkit-scrollbar-thumb]:bg-gray-400 [&::-webkit-scrollbar-thumb]:rounded-full"
>
          {ads.map((ad) => (
            <Link href={`/discover/${ad.id}`}
              key={ad.id}
              className="min-w-[150px] border border-gray-400 dark:border-gray-700 rounded-lg p-3 bg-gradient-to-r from-pink-50 to-pink-100 dark:from-gray-800 dark:to-gray-700 shadow-sm"
            >
              <p className="font-semibold text-sm">{ad.title}</p>
              <p className="text-sm text-gray-600 dark:text-gray-300">{ad.brand}</p>
            </Link>
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
              className="py-4 flex justify-between items-center hover:bg-gray-50 dark:hover:bg-gray-800/60 px-2"
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
