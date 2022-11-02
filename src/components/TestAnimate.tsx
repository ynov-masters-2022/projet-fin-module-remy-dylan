import { motion, AnimatePresence } from "framer-motion"

interface PropsTestAnimate {
  isVisible: boolean, 
}

const TestAnimate = ({ isVisible }:PropsTestAnimate) => {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        ><p>Animate presence</p></motion.div>
      )}
    </AnimatePresence>
 ); 
}

export default TestAnimate;