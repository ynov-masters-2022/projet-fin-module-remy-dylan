import { useEffect, useRef, useState  } from "react";
import { motion, AnimatePresence} from "framer-motion";

interface KeepNote {
    noteTitle: string;
    noteContent: string;
}

export const ContentCard = ({noteTitle,noteContent}: KeepNote) => {
    const [isBig, setIsBig] = useState(false)
    const cardRef:{current:any | null} = useRef();
    const [x, setX] = useState(0);
    const [y, setY] = useState(0);
    const [width,setWidth] = useState(0);
    const bigCardWidth = 400;

    const style: React.CSSProperties = {
        border: '5px solid #000',
        borderRadius: '40px',
        padding: '10px',
        margin: '5px',
        backgroundColor: 'yellow',
    };

    const smallStyle: React.CSSProperties = {
        height: '150px',
        width: '200px',
        position:'relative',
        left:'50px'
    }

    const bigStyle: React.CSSProperties = {
        height:'400px',
        width:`${bigCardWidth}px`,
        position:'fixed',
        zIndex:'100'
    }


    const getPosition = () => {
        const xTmp = cardRef?.current?.offsetLeft;
        const yTmp = cardRef?.current?.offsetTop;
        const widthTmp = cardRef?.current?.offsetWidth;
        if(xTmp !== undefined && yTmp !== undefined){
            setX(xTmp);
            setY(yTmp);
            setWidth(widthTmp);
        }
    };

    function togglePosition(){
        setIsBig(!isBig);
    }

    useEffect(() => {
        getPosition();
        window.addEventListener("click", getPosition);
    }, []);
    

    return(
        <div>
            <AnimatePresence> 

        {
            !isBig && (
                    <motion.div
                    key={noteTitle + 'small'}
                    initial={{ opacity: 0}}
                    animate={{ opacity: 1}}
                    exit={{ opacity: 0, maxHeight:'0px'}}
                    transition={{ duration: 0.5}}
                    >
                    <div ref={cardRef} style={{...style,...smallStyle}} onClick={togglePosition}>
                        <p>{noteTitle}</p>
                        <p>{noteContent}</p>
                    </div>
                    </motion.div>
            )
        }
        {
            isBig && (
                    <motion.div
                    key={noteTitle + 'big'} 
                    initial={{ opacity: 0, x:x,y:y}}
                    animate={{ opacity: 1, x:window.innerWidth/2 - width, y:window.innerHeight/2 - bigCardWidth/2}}
                    exit={{ opacity: 0, x:x,y:y}}
                    transition={{ duration: 0.5}}
                    >
                    <div style={{...style,...bigStyle}} >
                        <button onClick={togglePosition}>Set back to small</button>
                        <p>{noteTitle}</p>
                        <p>{noteContent}</p>
                    </div>
                    </motion.div>
        )}
            </AnimatePresence>                   
        </div>
    )
}