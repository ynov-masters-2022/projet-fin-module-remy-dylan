import { PanInfo, Point } from "framer-motion";
import { useContext } from "react";
import DraggableCard from "./CardDraggable";
import { useEffect, useRef, useState  } from "react";
import { motion, AnimatePresence} from "framer-motion";
import { AppContext } from "./Context";
import { KeepNoteType, Types } from "./reducers/KeepReducer";

interface PropsKeepCards {
    parentContainer: any,
    keepNote: KeepNoteType,
    isInTrashFn: (point: Point) => boolean, 
}
    
const KeepCard = ({ parentContainer, keepNote, isInTrashFn }: PropsKeepCards) => {
    const { dispatch } = useContext(AppContext);
    const [isBig, setIsBig] = useState(false)
    const cardRef:{current:any | null} = useRef();
    const bigCardWidth = 400;
    const [animateInitial, setAnimateInitial] = useState({ opacity: 0, x:0,y:0});
    const [animateBig, setAnimateBig] = useState({opacity:1,x:0,y:0});
    const [animateBigExit, setAnimateBigExit] = useState({opacity:0,x:0,y:0});

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('KEEP')
    }

    const keepCardStyle: React.CSSProperties = {
        border: '5px solid #000',
        borderRadius: '40px',
        padding: '10px',
        margin: '5px',
        backgroundColor: 'yellow',
    };

    const smallStyle: React.CSSProperties = {
        height: '150px',
        width: '200px',
    }

    const bigStyle: React.CSSProperties = {
        height:'400px',
        width:`${bigCardWidth}px`,
    }


    const getPosition = () => {
        const currentPositionTmp = cardRef.current.getBoundingClientRect();
        let xTmp = window.innerWidth/2 -200 - currentPositionTmp.x ;
        let Ytmp = window.innerHeight/2 -200 - currentPositionTmp.y ; 
        setAnimateBig({opacity:1,x:xTmp, y:Ytmp});
    };

    function togglePosition(){
        setIsBig(!isBig);
    }

    const handleOnDragEnd = (event: MouseEvent, info: PanInfo): void => {

        if(isInTrashFn(info.point)) {
            dispatch({
                type: Types.Remove,
                payload: {
                    id: keepNote.id,
                },
            });
        }


        const currentPositionTmp = cardRef.current.getBoundingClientRect();
        setAnimateInitial({ opacity: 0,x: info.point.x -currentPositionTmp.x -200,y: info.point.y -currentPositionTmp.y -200});
        /*
        info.point.x // x après déplacement
        info.point.y // y après déplacement
        animateBig.x // x de base
        animateBig.y // y de base
        xTmp = différence info.point.x & window.innerWidth/2-200 
        */

        let xTmp = info.point.x > window.innerWidth/2 ? (info.point.x - window.innerWidth/2) : (window.innerWidth/2 - info.point.x) ;
        let Ytmp = info.point.y > window.innerHeight/2 ? (info.point.y - window.innerHeight/2) : (window.innerHeight/2 - info.point.y) ; 
        const animateTmp = animateBig;
        animateTmp.x = xTmp;
        animateTmp.y = Ytmp;

        setAnimateBig(animateTmp);
        
        const animateExitTmp = animateBigExit;
        animateExitTmp.x = info.point.y -currentPositionTmp.y -100;
        animateExitTmp.y = info.point.x -currentPositionTmp.x -100;
        setAnimateBigExit(animateExitTmp);
        
    }

    const handleOnDrag = (event: MouseEvent, info: PanInfo): void => {
        if(isInTrashFn(info.point)) {
            
        }
    }

    useEffect(() => {
        getPosition();
    }, []);

    return (
        <div style={{position:'relative'}}>
        <AnimatePresence> 
        {
            !isBig && (
                <div ref={cardRef}>
                <DraggableCard parentContainer={parentContainer} onClick={handleClick} onDrag={handleOnDrag} onDragEnd={handleOnDragEnd}>
                    <motion.div
                    key={keepNote.id + 'small'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: {delay:1}}}
                    exit={{ opacity: 0}}
                    transition={{ duration: 1.5}}
                    >
                        <motion.button style={{...keepCardStyle,...smallStyle}} onTap={togglePosition}>
                            <h1>{keepNote.title}</h1>
                            <p>{keepNote.content}</p>
                        </motion.button>
                    </motion.div>                
                </DraggableCard>
                </div>
            )
        }
        {
            isBig && (
                <div style={{position:'absolute',zIndex:'100'}}>
                    <motion.div
                    key={keepNote.id + 'big'} 
                    initial={animateInitial}
                    animate={animateBig}
                    exit={animateBigExit}
                    transition={{ duration: 1.5}}
                    >
                    <div style={{...keepCardStyle,...bigStyle}} >
                        <motion.button onTap={togglePosition}>Set back to small</motion.button>
                        <h1>{keepNote.title}</h1>
                        <p>{keepNote.content}</p>
                    </div>
                    </motion.div>
                </div>
            )
        }
        </AnimatePresence>        
        </div>           
    );
}

export default KeepCard;