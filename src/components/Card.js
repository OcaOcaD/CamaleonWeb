
const Card = ({icon, unit, quantity, color}) => {
    
    return (
        <div className="card">
            { icon }
            <div className="content">
                <p> {quantity} </p>
                <p style={{color:color}}>{unit}</p>
            </div>
        </div>
    );
};

export default Card;
