export type ContentCardProps = {
    id:number,
    name:string,
    content:string
}

export const ContentCard = ({id,name,content}: ContentCardProps) => {
    
    const style: React.CSSProperties = {
        border: '5px solid #000',
        borderRadius: '40px',
        height: '150px',
        width: '200px',
        padding: '10px',
        margin: '5px',
    };

    return (
        <div style={style}>
            <p>{name}</p>
            <textarea>{content}</textarea>
        </div>
    );
}