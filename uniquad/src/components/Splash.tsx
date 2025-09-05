"use client"

import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "@/components/logo"

export default function Splash() {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
    }, 2500) // ⏳ show for 2.5s
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-white dark:bg-gray-900"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col items-center"
          >
            <Logo />
            <h1 className="mt-4 text-3xl font-bold text-orange-800">UniQuad</h1>
            <p className="text-orange-600">Enlarge Your Possibilities</p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
