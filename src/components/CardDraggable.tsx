import { motion } from "framer-motion";

interface IDraggableCardProps extends React.PropsWithChildren {
    parentContainer: any;
    cardStyle?: React.CSSProperties;
    onClick: (event: any) => void;
    onDragEnd: (event:any, info:any) => void;
}

const DraggableCard = ({ parentContainer, onClick, children, onDragEnd}: IDraggableCardProps) => {
    return (
        <motion.div
            drag
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            dragConstraints={parentContainer}
            onClick={onClick}
            onDragEnd={onDragEnd}
            // onDrag={onDragColission}
            // dragControls={controls}
            // dragMomentum={false}
        >
            {children}
        </motion.div>
    )
}

export default DraggableCard;