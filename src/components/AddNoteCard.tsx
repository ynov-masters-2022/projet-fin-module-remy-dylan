import DraggableCard from "./CardDraggable";
import plusIcon from "./../assets/icons8-plus.svg";
import { useContext } from "react";
import { AppContext } from "./Context";
import { Types } from "./reducers/KeepReducer";

interface IAddNoteCardProps {
    parentContainer: any;
}

const keepCardStyle: React.CSSProperties = {
    border: '5px solid #000',
    borderRadius: '40px',
    height: '150px',
    width: '200px',
    padding: '10px',
    margin: '5px',
    backgroundColor: 'red',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
};

const AddNoteCard = ({ parentContainer }: IAddNoteCardProps) => {
    const { dispatch } = useContext(AppContext);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        dispatch({
            type: Types.Add,
            payload: {
                title: 'Test',
                content: 'YES',
            },
        });
    }

    return (
        <DraggableCard parentContainer={parentContainer} onClick={handleClick} cardStyle={keepCardStyle}>
            <img src={plusIcon} alt={"AH"} />
        </DraggableCard>
    )
}

export default AddNoteCard;