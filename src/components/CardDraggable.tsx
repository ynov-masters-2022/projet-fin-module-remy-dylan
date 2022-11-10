import { motion, PanInfo } from "framer-motion";

interface IDraggableCardProps extends React.PropsWithChildren {
    parentContainer: any;
    cardStyle?: React.CSSProperties;
    onClick?: (event: any) => void;
    onDrag?: (event: MouseEvent, info: PanInfo) => void;
    onDragEnd?: (event: MouseEvent, info: PanInfo) => void;
}

const DraggableCard = ({ parentContainer, onClick, onDrag, onDragEnd, children}: IDraggableCardProps) => {
    return (
        <motion.div
            drag
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            dragConstraints={parentContainer}
            onClick={onClick}
            onDrag={onDrag}
            onDragEnd={onDragEnd}
        >
            {children}
        </motion.div>
    )
}

export default DraggableCard;