"use client"

import { Calendar, MapPin, User, Image as ImageIcon } from "lucide-react"
import { useSession } from "next-auth/react"
import { useState } from "react"

export default function NewEventBox() {
  const { data: session } = useSession()
  const [date, setDate] = useState("")
  const [location, setLocation] = useState("")
  const [images, setImages] = useState<File[]>([])
  const [text, setText] = useState("")

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImages([...images, e.target.files[0]])
    }
  }

  const handleCancel = () => {
    setText("")
    setImages([])
    setDate("")
    setLocation("")
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
        <div className="flex-1 flex flex-col space-y-3">
          {/* Event text */}
          <textarea
            placeholder="Tell us where it is happening... 🎉"
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

          {/* Extra inputs */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4 space-y-2 sm:space-y-0">
            {/* Date */}
            <div className="flex items-center w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800">
              <Calendar className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full focus:outline-none dark:text-gray-100"
              />
            </div>

            {/* Location */}
            <div className="flex items-center w-full sm:w-auto border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800">
              <MapPin className="w-4 h-4 text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full focus:outline-none dark:text-gray-100"
              />
            </div>

            {/* Image upload */}
            <label className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg px-3 py-2 bg-gray-50 dark:bg-gray-800 cursor-pointer">
              <ImageIcon className="w-6 h-6 text-gray-500 " />
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
