"use client"

import axiosInstance from "@/lib/api-client"
import { Calendar, MapPin, User, CalendarPlus, MapPinPlus, ImagePlusIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function NewEventBox({source, parent=null}:{source:string, parent: string | null}) {
  const { data: session } = useSession()
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [text, setText] = useState("")
  const [title, setTitle] = useState("")
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
    setTitle("")
  }

   const handleDateChange = (value: string) => {
    setDate(value)
  }

  const handleLocationChange = (value: string) => {
    setLocation(value)
  }

  const handleSubmit = async() => {
    await axiosInstance.post('/events-management/events', {
      title:title, 
      content: text, 
      e_date: date, 
      location: location, 
      venue: location,
      created_by: session.user.id,
      parent_post: parent
    })
    .then(res => {
      alert('Success')
      handleCancel()
    })
    .finally(() => console.log('final'))
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
    <div className="flex flex-col w-full mb-2">
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
          {source.toLowerCase() === 'event' && <input
            placeholder="Event title"
            className="w-full text-sm p-2 border border-gray-200 mb-1 dark:border-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-gray-100"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          /> }
          {/* Event text */}
          <textarea
            placeholder="Describe it a little more... 🎉"
            className="w-full text-sm resize-none p-2 border border-gray-200 dark:border-gray-800 focus:ring-2 focus:ring-orange-500 focus:outline-none dark:text-gray-100"
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
           <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400 mb-1">
             {date && <div className="flex items-center space-x-1">
               <Calendar className="w-4 h-4" />
               <span>{formatEventTime(new Date(date))}</span>
             </div>}
             {location && <div className="flex items-center space-x-1">
               <MapPin className="w-4 h-4" />
               <span>{location}</span>
             </div>}
           </div>


          {/* Popup inputs */}
          {activePopup === "date" && (
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-gray-50 dark:bg-gray-800 mb-1">
              <input
                type="date"
                value={date}
                placeholder="Choose date & time"
                onChange={(e) => handleDateChange(e.target.value)}
                onBlur={() => setActivePopup(null)}
                autoFocus
                className="focus:outline-none bg-transparent text-sm dark:text-gray-100 w-full"
              />
            </div>
          )}

          {activePopup === "location" && (
            <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-1 bg-gray-50 dark:bg-gray-800 mb-1">
              <input
                type="text"
                placeholder="Enter location..."
                value={location}
                onChange={(e) => handleLocationChange(e.target.value)}
                onBlur={() => setActivePopup(null)} // closes after typing
                autoFocus
                className="focus:outline-none bg-transparent text-sm dark:text-gray-100 w-full"
              />
            </div>
          )}


          <div className="flex flex-row justify-between">
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


          {/* Action buttons */}
          {(text.trim() !== "" || images.length > 0) && (
            <div className="flex justify-end space-x-3 mt-3">
              <button
                onClick={handleCancel}
                className="px-2 py-1 text-xs rounded-lg border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-2 py-1 text-xs rounded-lg bg-orange-600 text-white hover:bg-orange-700 border border-gray-300 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-800 transition"
              >
                Submit
              </button>
            </div>
          )}
          </div>
        </div>
      </div>
    </div>
  )
}
