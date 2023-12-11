import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Предполагается, что вы используете React Router
import './Card.css';

interface CardProps {
    id: number;
    name: string;
    image: string;
    price: number;
}

const Card: React.FC<CardProps> = (props) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div className="card-container">
            <img className="card-image" src={props.image} alt={props.name} />

            <div className="card-content">
                <h3 className="card-title">{props.name}</h3>

                {/* Цена слева внизу */}
                <div className="card-price">
                    {props.price} рублей
                </div>
            </div>

            {/* Кнопка справа внизу */}
            <div className="card-button-container">
                <Link to={`/roads/${props.id}`} style={{ marginRight: '10px', textDecoration: 'none' }}>
                    <button
                        className="card-button"
                        onMouseOver={() => setIsHovered(true)}
                        onMouseOut={() => setIsHovered(false)}
                    >
                        Подробнее
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default Card;
