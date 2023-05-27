import Card from "./Card.js";
import { useContext } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";

function Main({ cards, onEditProfile, onAddPlace, onEditAvatar, onCardClick, onCardLike, onCardDelete, }) {
    const user = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img
                        className="profile__avatar-image"
                        src={user.avatar}
                        onClick={() => {
                            onEditAvatar(true);
                        }}
                    />
                </div>

                <div className="profile__info">
                    <h1 className="profile__name">{user.name}</h1>
                    <button
                        className="profile__button-edit"
                        type="button"
                        onClick={() => {
                            onEditProfile(true);
                        }}
                    ></button>

                    <p className="profile__description">{user.about}</p>
                </div>
                <button
                    type="button"
                    aria-label="Добавть карточку"
                    className="profile__button-add"
                    onClick={() => {
                        onAddPlace(true);
                    }}
                ></button>
            </section>

            <section className="elements">

                {cards.map((card) => (
                    <Card
                        name={card.name}
                        link={card.link}
                        likes={card.likes}
                        key={card._id}
                        id={card._id}
                        owner={card.owner}
                        onCardClick={onCardClick}
                        onCardLike={onCardLike}
                        onCardDelete={onCardDelete}
                    />
                ))}

            </section>
        </main>
    );
}

export default Main;