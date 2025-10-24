"use client"
import { useState } from "react"
import SearchInput from "./SearchInput"
import NewEventBox from "./NewPostBox"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"
import Link from "next/link"

export default function ContentHeader({welcomeMsg, newItemName}: {welcomeMsg: string, newItemName: string}) {
  const [showSearch, setShowSearch] = useState(false)
  const [showNewEvent, setShowNewEvent] = useState(false)

  const {data: session} = useSession()

  if (!session) {
    redirect('/')
  }

  return (
    <div className="border-gray-200 dark:border-gray-800 pl-4 pr-4 pt-4 pb-2 transition-shadow">
     
      <div className="text-gray-600 dark:text-gray-400 mb-1 text-xs flex flex-row justify-between items-center">
        {/* <div className="font-bold">{welcomeMsg}</div> */}
         <div className="relative flex h-fit items-center justify-between">
          
          <ul className="flex-1 items-center justify-center gap-4 md:gap-8 flex text-xs overflow-x">
            <Link
                href={"#"} className={`text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative`}>
                    <small className="text-xs">For You</small>
              </Link>
              <Link
                href={"#"} className={`text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative`}>
                    <span className="text-xs">Latest</span>
              </Link>
              <Link
                href={"#"} className={`text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors relative`}>
                    <span className="text-xs">Most Upvoted</span>
              </Link>
              
          </ul>
          </div>
        <div className="flex gap-2">
          <button
            onClick={() => {
              setShowSearch((prev) => !prev)
              setShowNewEvent(false)
            }}
            className="px-2 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
            Search
          </button>
          <button
            onClick={() => {
              setShowNewEvent((prev) => !prev)
              setShowSearch(false)
            }}
            className="px-2 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
          >
          {showNewEvent ? "Cancel" : `New ${newItemName}`}
          </button>
        </div>
      </div>

      {showSearch && <SearchInput />}
      {showNewEvent && <NewEventBox source={newItemName} parent={""} setShowNewEvent={() => setShowNewEvent(false)}/>}
    </div>
  )
}
