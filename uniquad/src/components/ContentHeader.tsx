"use client"
import { useState } from "react"
import SearchInput from "./SearchInput"
import NewEventBox from "./NewPostBox"
import { redirect } from "next/navigation"
import { useSession } from "next-auth/react"

export default function ContentHeader({welcomeMsg, newItemName}: {welcomeMsg: string, newItemName: string}) {
  const [showSearch, setShowSearch] = useState(false)
  const [showNewEvent, setShowNewEvent] = useState(false)

  const {data: session} = useSession()

  if (!session) {
    redirect('/')
  }

  if (!(session as any)?.user?.campus){
    redirect('/setup')
  }

  return (
    <div className="md:border-b md:border-t md:border-r md:border-l border-gray-200 dark:border-gray-800 p-4 transition-shadow">
      <div className="text-gray-600 dark:text-gray-400 mb-4 text-xs flex flex-row justify-between items-center">
        <div>{welcomeMsg}</div>
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
            New {newItemName}
          </button>
        </div>
      </div>

      {showSearch && <SearchInput />}
      {showNewEvent && <NewEventBox />}
    </div>
  )
}
