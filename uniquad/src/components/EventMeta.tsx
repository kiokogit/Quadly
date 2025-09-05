import { useState } from "react"

export default function EventMeta({ event }: { event: any }) {
  const [showTooltip, setShowTooltip] = useState(false)

  
const formatTime = (date: Date) => {
  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" })
  const diffInSeconds = Math.floor((date.getTime() - Date.now()) / 1000)

  const divisions: { amount: number; name: Intl.RelativeTimeFormatUnit }[] = [
    { amount: 60, name: "second" },
    { amount: 60, name: "minute" },
    { amount: 24, name: "hour" },
    { amount: 7, name: "day" },
    { amount: 4.34524, name: "week" },
    { amount: 12, name: "month" },
    { amount: Number.POSITIVE_INFINITY, name: "year" },
  ]

  let duration = diffInSeconds
  for (let i = 0; i < divisions.length; i++) {
    const division = divisions[i]
    if (Math.abs(duration) < division.amount) {
      return rtf.format(Math.round(duration), division.name)
    }
    duration /= division.amount
  }
}


  return (
    <small className="relative text-xs mt-1 text-gray-500 dark:text-gray-400 flex items-center">
      {/* User ID with hover */}
      <i
        className="text-xs font-normal max-w-[8ch] truncate overflow-hidden block cursor-pointer"
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        @{event.userId}
      </i>

      <span className="mx-1">•</span>

      <i className="text-xs font-normal">
        {formatTime(new Date(event.createdAt))}
      </i>

      {/* Tooltip */}
      {showTooltip && (
        <div className="absolute left-0 top-full mt-2 w-64 bg-white dark:bg-gray-800 shadow-lg rounded-lg p-3 border border-gray-200 dark:border-gray-700 z-50">
          <div className="flex items-center space-x-3">
            <img
              src={event.user?.image || "/default-avatar.png"}
              alt={event.user?.name || "User"}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                {event.user?.name || "Unknown User"}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Joined {new Date(event.user?.joinedAt).getFullYear()}
              </p>
            </div>
          </div>
          {event.user?.bio && (
            <p className="mt-2 text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
              {event.user.bio}
            </p>
          )}
        </div>
      )}
    </small>
  )
}
