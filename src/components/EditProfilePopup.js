import { useContext, useEffect } from "react";
import { CurrentUserContext } from "../context/CurrentUserContext.js";
import PopupWithForm from "./PopupWithForm.js";
import useFormValidation from "../utils/useFormValidation.js";

function EditProfilePopup({ isOpen, onClose, onOverlayClick, onUpdateUser, onLoading, }) {

    const currentUser = useContext(CurrentUserContext);
    const { values, isValid, handleChange, setValue, reset, formRef } =
        useFormValidation();

    useEffect(() => {
        setValue("name", currentUser.name);
        setValue("about", currentUser.about);
    }, [currentUser, isOpen, setValue]);

    function handleSubmit(e) {
        e.preventDefault();

        if (isValid) {
            onUpdateUser({
                name: values["name"],
                about: values["about"],
            });
        }
    }

    const onClosePopup = () => {
        onClose();
        reset({ name: currentUser.name, about: currentUser.about });
    };

    return (
        <PopupWithForm
            name="profile"
            title="Редактировать профиль"
            isOpen={isOpen}
            onClose={onClosePopup}
            onSubmit={handleSubmit}
            buttonText={onLoading ? `Сохранение...` : `Сохранить`}
            onOverlayClick={onOverlayClick}
            isValid={isValid}
            ref={formRef}
        >
            <input
                className="popup__input"
                name="name"
                type="text"
                placeholder="Ваше имя"
                minLength="2"
                maxLength="40"
                onChange={handleChange}
                value={values["name"] || ""}
                required
            //id="username"
            />
            { /*<span className="input-name-error">{errors.name}</span> */}
            <input
                className="popup__input"
                name="about"
                type="text"
                placeholder="Описание"
                minLength="2"
                maxLength="200"
                onChange={handleChange}
                value={values["about"] || ""}
                required
            //id="about"
            />
            { /*<span className="job-input-error">{errors.about}</span> */}
        </PopupWithForm>
    );
}

export default EditProfilePopup;