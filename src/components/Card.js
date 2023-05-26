import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js'

function Card(card) {
    const currentUser = useContext(CurrentUserContext);
    const isOwner = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = `elements__button-like ${isLiked ? 'elements__button-like_active' : ''}`;

    function handleCardClick() {
        card.onCardClick(card);
    }

    function handleLikeClick() {
        card.onCardLike(card);
    }

    function handleDeleteClick() {
        card.onCardDelete(card)
    }

    return (
        <article className="elements__card">
            {isOwner && <button className="elements__button-delete" type="button" onClick={handleDeleteClick} />}
            <img className="elements__image" alt={card.name} src={card.link} onClick={handleCardClick} />
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick} />
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </article>
    )
}

export default Card;