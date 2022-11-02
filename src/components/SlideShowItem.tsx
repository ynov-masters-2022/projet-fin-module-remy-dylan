import { motion, AnimatePresence } from "framer-motion"

interface PropsSlideShowItem {
  children: any
}

export const SlideshowItem = ({ children }:PropsSlideShowItem) => {
  return (
    <AnimatePresence>
      <motion.p
        initial={{ x: 300, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -300, opacity: 0 }}
      >
        <div>
          {children}
        </div>
      </motion.p>
    </AnimatePresence>
  );
};