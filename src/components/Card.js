import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Card(card) {
    const user = useContext(CurrentUserContext);
    const isOwn = card.owner._id === user._id;
    const isLiked = card.likes.some((like) => like._id === user._id);
    const cardLikeButtonClassName = `elements__button-like ${isLiked ? 'elements__button-like_active' : ''}`;

    function handleCardClick() {
        card.onCardClick(card);
    }

    function handleLikeClick() {
        card.onCardLike(card);
    }

    function handleCardDeleteClick() {
        card.onCardDelete(card);
    }

    return (
        <article className="elements__card">
            {isOwn && (
                <button
                    className="elements__button-delete"
                    type="button"
                    onClick={handleCardDeleteClick}
                ></button>
            )}
            <img
                className="elements__image"
                src={card.link}
                alt={card.name}
                onClick={handleCardClick}
            />
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button
                        className={cardLikeButtonClassName}
                        type="button"
                        onClick={handleLikeClick}
                    ></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    );
}

export default Card;