import { PanInfo, Point } from "framer-motion";
import { useContext } from "react";
import DraggableCard from "./CardDraggable";
import { useEffect, useRef, useState  } from "react";
import { motion, AnimatePresence} from "framer-motion";
import { AppContext } from "./Context";
import { KeepNoteType, Types } from "../reducers/KeepReducer";

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

    const [title, setTitle] = useState(keepNote.title);
    const [content, setContent] = useState(keepNote.content);

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

    const titleStyle: React.CSSProperties = {
        backgroundColor: '#d3d3d3',
        fontSize:'25px',
        border:'1px solid #000',
        margin: '5px 0px',
        width:'80%',
    }

    const contentStyle: React.CSSProperties = {
        backgroundColor: '#d3d3d3',
        fontSize:'18px',
        border:'1px solid #000',
        margin: '10px 0px',
        width:'80%',
        height:'80%',
        resize: 'none'
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

    const handleChange = (): void => {
        dispatch({
            type: Types.Edit,
            payload: {
                id: keepNote.id,
                title: title,
                content: content,
            },
        });
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

        let xTmp = info.point.x > window.innerWidth/2 ? (info.point.x - window.innerWidth/2) : (window.innerWidth/2 - info.point.x) ;
        let Ytmp = info.point.y > window.innerHeight/2 ? (info.point.y - window.innerHeight/2) : (window.innerHeight/2 - info.point.y) ; 
        const animateTmp = animateBig;
        animateTmp.x = xTmp;
        animateTmp.y = Ytmp;

        setAnimateBig(animateTmp);
        
        const animateExitTmp = animateBigExit;
        animateExitTmp.x = info.point.x -currentPositionTmp.x -100;
        animateExitTmp.y = info.point.y -currentPositionTmp.y -100; 
        setAnimateBigExit(animateExitTmp);
        
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
                <DraggableCard parentContainer={parentContainer} onDragEnd={handleOnDragEnd}>
                    <motion.div
                    key={keepNote.id + 'small'}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1, transition: {delay:0.5}}}
                    exit={{ opacity: 0,height:'0px'}}
                    transition={{ duration: 0.75}}
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
                <div style={{position:'absolute',zIndex:'100'}} key={keepNote.id + 'big'}>
                    <motion.div
                    initial={animateInitial}
                    animate={animateBig}
                    exit={animateBigExit}
                    transition={{ duration: 0.75}}
                    >
                        <div style={{...keepCardStyle,...bigStyle}}>
                            <motion.button style={{position:'absolute',right:'25px'}} onTap={togglePosition}>Reduce</motion.button>
                            <input type="text" style={titleStyle} value={title} onChange={(e) => {
                                setTitle(e.target.value);
                                handleChange();
                            }}/>
                            <textarea style={contentStyle} value={content} onChange={(e) => {
                                setContent(e.target.value)
                                handleChange();
                            }}/>
                            
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