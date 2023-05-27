import { useEffect } from "react";
import useFormValidation from "../utils/useFormValidation.js";
import PopupWithForm from "./PopupWithForm.js";

function AddPlacePopup({ isOpen, onClose, onOverlayClick, onAddPlace, onLoading, }) {
    const { values, errors, isValid, handleChange, setValue, reset, formRef } =
        useFormValidation();

    useEffect(() => {
        setValue("name", "");
        setValue("link", "");
    }, [isOpen, setValue]);

    function handleSubmit(e) {
        e.preventDefault();
        if (isValid) {
            onAddPlace({ name: values.name, link: values.link });
        }
    }

    const onClosePopup = () => {
        onClose();
        reset();
    };

    return (
        <PopupWithForm
            name="place"
            title="Новое место"
            isOpen={isOpen}
            onClose={onClosePopup}
            onSubmit={handleSubmit}
            onLoading={onLoading}
            onOverlayClick={onOverlayClick}
            isValid={isValid}
            ref={formRef}
        >
            <input
                className="popup__input popup__input_type_title"
                name="name"
                type="text"
                value={values["name"] || ""}
                placeholder="Название"
                minLength="2"
                maxLength="30"
                onChange={handleChange}
                required
            //id="locate-name"
            />
            { /*<span className=" popup__input-error_visible">{errors.name}</span> */}
            <input
                className="popup__input popup__input_type_link"
                name="link"
                type="url"
                placeholder="Ссылка на картинку"
                value={values["link"] || ""}
                onChange={handleChange}
                required
            //id="avatar-link"
            />
            { /*<span className="popup__input-error_visible">{errors.link}</span> */}
        </PopupWithForm>
    );
}

export default AddPlacePopup;