import { useContext, useEffect, useState } from 'react';
import { CurrentUserContext } from '../context/CurrentUserContext.js'
import PopupWithForm from './PopupWithForm';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, onLoading }) {
    const currentUser = useContext(CurrentUserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value);
    }

    function handleChangeAbout(e) {
        setDescription(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateUser({
            name: name,
            about: description,
        });
    }

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            buttonText={onLoading ? `Сохранение...` : `Сохранить`}
            onClose={onClose}
            isOpen={isOpen}
            onSubmit={handleSubmit}>
            <input
                className="popup__input"
                name="userName"
                type="text"
                placeholder="Имя"
                minLength="2"
                maxLength="40"
                value={name || ""}
                onChange={handleChangeName}
                required
            />
            <span className="input-name-error" />
            <input
                className="popup__input"
                name="job-input"
                type="text"
                placeholder="Описание"
                minLength="2"
                maxLength="200"
                value={description || ""}
                onChange={handleChangeAbout}
                required
            />
            <span className="job-input-error" />
        </PopupWithForm>
    )
}

export default EditProfilePopup;