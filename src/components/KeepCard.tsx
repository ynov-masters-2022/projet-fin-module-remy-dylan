import DraggableCard from "./CardDraggable";

interface PropsKeepCards {
    parentContainer: any,
    noteTitle: string,
    noteContent: string,
}

const KeepCard = ({ parentContainer, noteTitle, noteContent }: PropsKeepCards) => {

    const keepCardStyle: React.CSSProperties = {
        border: '5px solid #000',
        borderRadius: '40px',
        height: '150px',
        width: '200px',
        padding: '10px',
        margin: '5px',
        backgroundColor: 'yellow',
    };

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>): void => {
        console.log('KEEP')
    }

    return (
        <DraggableCard cardStyle={keepCardStyle} onClick={handleClick} parentContainer={parentContainer}>
            <h1>{noteTitle}</h1>
            <p>{noteContent}</p>
        </DraggableCard>
    );
}

export default KeepCard;