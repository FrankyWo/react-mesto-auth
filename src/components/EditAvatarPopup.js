import { useEffect } from "react";

import PopupWithForm from "./PopupWithForm.js";
import useFormValidation from "../utils/useFormValidation.js";

function EditAvatarPopup({ isOpen, onClose, onOverlayClick, onUpdateAvatar, onLoading, }) {
    const { values, errors, isValid, handleChange, setValue, reset, formRef } =
        useFormValidation();

    useEffect(() => {
        setValue("avatar", "");
    }, [isOpen, setValue]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onUpdateAvatar({ avatar: values.avatar });
        }
    }

    const onClosePopup = () => {
        onClose();
        reset();
    };

    return (
        <PopupWithForm
            name="avatar"
            title="Обновить аватар"
            isOpen={isOpen}
            onClose={onClosePopup}
            onSubmit={handleSubmit}
            buttonText={onLoading ? `Сохранение...` : `Сохранить`}
            onOverlayClick={onOverlayClick}
            isValid={isValid}
            ref={formRef}>
            <input
                className="popup__input"
                name="avatar"
                type="url"
                id="avatar-link-input"
                placeholder="Ссылка на картинку"
                value={values["avatar"] || ""}
                onChange={handleChange}
                required
            />
            { /*<span className="avatar-link-input-error popup__input-error">{errors["avatar"]}</span> */}
        </PopupWithForm>
    );
}

export default EditAvatarPopup;