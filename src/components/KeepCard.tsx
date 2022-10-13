const KeepCard = () => {
    
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
            <p>A card</p>
        </div>
    );
}

export default KeepCard;