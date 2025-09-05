"use client"

import { Calendar, MapPin, User, Image as ImageIcon, Plus, CalendarPlus, MapPinPlus, ImagePlusIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function NewEventBox() {
  const { data: session } = useSession()
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [text, setText] = useState("")
 // control which popup is open
  const [activePopup, setActivePopup] = useState<"date" | "location" | "image" | null>(null)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImages([...images, e.target.files[0]])
      setActivePopup(null)
    }
  }

  const handleCancel = () => {
    setText("")
    setImages([])
    setDate("")
    setLocation("")
  }

   const handleDateChange = (value: string) => {
    setDate(value)
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
  }

  const handleSubmit = () => {
    console.log({
      text,
      date,
      location,
      images,
    })
    // TODO: submit logic
    handleCancel()
  }
   const formatEventTime = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit'
    });
  };

  return (
    <div className="flex flex-col w-full mb-4">
      <div className="flex items-start space-x-3">
        {/* Avatar */}
        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
          {session?.user ? (
            <img
              src={session.user.image || ""}
              alt={session.user.name || "User"}
              className="w-full h-full rounded-full object-cover"
            />
          ) : (
            <User className="w-5 h-5 text-gray-600" />
          )}
        </div>

        {/* Input area */}
        <div className="flex-1 flex flex-col">
          {/* Event text */}
          <textarea
            placeholder="Share it with comrades... 🎉"
            className="w-full resize-none p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none dark:text-gray-100"
            rows={2}
            value={text}
            onChange={(e) => setText(e.target.value)}
          />

          {/* Image preview */}
          {images && (
            <div className="relative mt-2">
                {images.map((image, index) => (
                    <img
                    key={index}
                        src={URL.createObjectURL(image)}
                        alt="Preview"
                        className="max-h-60 rounded-lg border border-gray-300 dark:border-gray-600 object-cover"
                    />
                ))}
              
            </div>
          )}

         {/* Event Details */}
           <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mt-1 mb-3">
             {date && <div className="flex items-center space-x-1">
               <Calendar className="w-4 h-4" />
               <span>{formatEventTime(new Date(date))}</span>
             </div>}
             {location && <div className="flex items-center space-x-1">
               <MapPin className="w-4 h-4" />
               <span>{location}</span>
             </div>}
           </div>

          <div className="flex flex-row gap-4 justify-left text-gray-600 dark:text-gray-400">
            {/* Date picker icon */}
            <button
              type="button"
              onClick={() => setActivePopup(activePopup === "date" ? null : "date")}
              className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <CalendarPlus className="w-5 h-5" />
            </button>

            {/* Location icon */}
            <button
              type="button"
              onClick={() => setActivePopup(activePopup === "location" ? null : "location")}
              className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              <MapPinPlus className="w-5 h-5" />
            </button>

            {/* Image upload icon */}
            <label className="rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
              <ImagePlusIcon className="w-5 h-5" />
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Popup inputs */}
          {activePopup === "date" && (
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-gray-50 dark:bg-gray-800 mt-2">
              <input
                type="datetime-local"
                value={date}
                onChange={(e) => handleDateChange(e.target.value)}
                onBlur={(e) => setActivePopup(null)}
                className="focus:outline-none bg-transparent text-sm dark:text-gray-100 w-full"
              />
            </div>
          )}

          {activePopup === "location" && (
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-gray-50 dark:bg-gray-800 mt-2">
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onBlur={(e) => setActivePopup(null)} // closes after typing
                autoFocus
                className="focus:outline-none bg-transparent text-sm dark:text-gray-100 w-full"
              />
            </div>
          )}


          {/* Action buttons */}
          {(text.trim() !== "" || images.length > 0) && (
            <div className="flex justify-end space-x-3 mt-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm rounded-lg border border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 text-sm rounded-lg bg-orange-600 text-white hover:bg-orange-700"
              >
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
