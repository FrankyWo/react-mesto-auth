import Card from './Card';
import { useContext } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js'

function Main(props) {
    const currentUser = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar">
                    <img src={currentUser.avatar} alt='#' className="profile__avatar-image" />
                    <button className="profile__avatar-edit-button" onClick={() => { props.onEditAvatar(true) }} />
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="profile__button-edit" type="button" onClick={() => { props.onEditProfile(true) }} />
                    <p className="profile__description">{currentUser.about}</p>
                </div>
                <button className="profile__button-add" type="button" onClick={() => { props.onAddPlace(true) }} />
            </section>

            <section className="elements">
                {props.cards.map(card => (
                    <Card
                        card={card}
                        key={card._id}
                        id={card._id}
                        owner={card.owner}
                        name={card.name}
                        link={card.link}
                        likes={[...card.likes]}
                        onCardClick={props.onCardClick}
                        onCardLike={props.onCardLike}
                        onCardDelete={props.onCardDelete}
                    />
                ))}
            </section>
        </main>
    )
}

export default Main;