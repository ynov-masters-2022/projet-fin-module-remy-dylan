import DraggableCard from "./CardDraggable";
import plusIcon from "./../assets/icons8-plus.svg";

interface IAddNoteCardProps {
    parentContainer: any,
}

const AddNoteCard = ({ parentContainer }: IAddNoteCardProps) => {

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

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('ADD');
    }

    return (
        <DraggableCard parentContainer={parentContainer} onClick={handleClick} cardStyle={keepCardStyle} onDragEnd={() => null}>
            <img src={plusIcon} alt={"AH"} />
        </DraggableCard>
    )
}

export default AddNoteCard;