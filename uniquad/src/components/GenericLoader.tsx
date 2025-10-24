"use client"

import { useEffect, useState } from "react"
import { useLoaderStore } from "@/stores/genericStores"

export default function Loader() {
  const { loading } = useLoaderStore()
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let interval: NodeJS.Timeout

    if (loading) {
      setProgress(0)
      interval = setInterval(() => {
        setProgress((p) => (p < 90 ? p + Math.random() * 10 : p))
      }, 150)
    } else {
      // Finish the progress bar
      setProgress(100)
      const timeout = setTimeout(() => setProgress(0), 300)
      return () => clearTimeout(timeout)
    }

    return () => clearInterval(interval)
  }, [loading])

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999] h-[3px] bg-transparent"
      aria-hidden="true"
    >
      <div
        className="h-full bg-orange-500 transition-all duration-200 ease-out"
        style={{
          width: `${progress}%`,
          opacity: loading || progress > 0 ? 1 : 0,
        }}
      />
    </div>
  )
}
