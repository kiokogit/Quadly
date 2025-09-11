"use client";

import { useSwipeable } from "react-swipeable";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

import { motion, AnimatePresence } from "framer-motion";

const pages = ["/home", "/events", "/discover", "/forum", "reviews"]; // order matches navbar

export default function SwipeWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();

  const index = pages.indexOf(pathname);

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      if (index < pages.length - 1) {
        router.push(pages[index + 1]);
      }
    },
    onSwipedRight: () => {
      if (index > 0) {
        router.push(pages[index - 1]);
      }
    },
    trackMouse: true, // also works with mouse drag
  });

  return (
    <div {...handlers} className="h-full w-full">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={pathname} // triggers animation on route change
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="h-full w-full"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
