import { motion, AnimatePresence } from "framer-motion"
import KeepCard from './KeepCard';

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
        ><KeepCard/></motion.div>
      )}
    </AnimatePresence>
 ); 
}

export default TestAnimate;