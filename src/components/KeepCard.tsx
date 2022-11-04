import { PanInfo, Point } from "framer-motion";
import { useContext } from "react";
import DraggableCard from "./CardDraggable";
import { AppContext } from "./Context";
import { KeepNoteType, Types } from "./reducers/KeepReducer";

interface PropsKeepCards {
    parentContainer: any,
    keepNote: KeepNoteType,
    isInTrashFn: (point: Point) => boolean, 
}

const keepCardStyle: React.CSSProperties = {
    border: '5px solid #000',
    borderRadius: '40px',
    height: '150px',
    width: '200px',
    padding: '10px',
    margin: '5px',
    backgroundColor: 'yellow',
};

const KeepCard = ({ parentContainer, keepNote, isInTrashFn }: PropsKeepCards) => {
    const { dispatch } = useContext(AppContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('KEEP')
    }

    const handleOnDrag = (event: MouseEvent, info: PanInfo): void => {
        if(isInTrashFn(info.point)) {
            
        }
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
    }

    return (
        <DraggableCard 
            cardStyle={keepCardStyle}
            onClick={handleClick}
            parentContainer={parentContainer}
            onDrag={handleOnDrag}
            onDragEnd={handleOnDragEnd}
        >
            <h1>{keepNote.title}</h1>
            <p>{keepNote.content}</p>
        </DraggableCard>
    );
}

export default KeepCard;