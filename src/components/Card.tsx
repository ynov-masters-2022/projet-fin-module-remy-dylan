import { motion } from "framer-motion"

interface PropsCard {
    cardId: string, 
    toDoOnClick: Function
}

const Card = ({ cardId, toDoOnClick }:PropsCard) => {
    return(
    <motion.div layoutId={cardId} onClick={toDoOnClick(cardId)}>
        <p>cardId</p>
    </motion.div>
    );
}

export default Card;
